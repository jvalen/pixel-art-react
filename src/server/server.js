/**
 * Module dependencies.
 */
import { renderToString } from 'react-dom/server';
import undoable from 'redux-undo';
import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import temp from 'temp';
import fs from 'fs';
import Twitter from 'twitter';
import { OAuth } from 'oauth';
import session from 'express-session';
import React from 'react';
import { createStore } from 'redux';
import reducer from '../store/reducers/reducer';
import pkgjson from '../../package.json';
import {
  drawFrame,
  drawGif,
  drawSpritesheet
} from '../utils/imageGeneration';
import Root from '../components/Root';

const app = express();
module.exports = app;
console.log(`Version deployed: ${pkgjson.version}`);

/**
 * Configuration
 */
let configData;
const PORTSERVER = 3000;
const ENV = process.env.NODE_ENV || 'development';

if (ENV === 'development') {
  configData = JSON.parse(fs.readFileSync('config.json', 'utf8')).dev;
} else {
  configData = process.env;
}

const oa = new OAuth(
  'https://api.twitter.com/oauth/request_token',
  'https://api.twitter.com/oauth/access_token',
  configData.TWITTER_CONSUMER_KEY,
  configData.TWITTER_CONSUMER_SECRET,
  '1.0A',
  configData.TWITTER_CALLBACK_URL,
  'HMAC-SHA1'
);

app.use((req, res, next) => {
  const host = req.get('Host');
  if (host === configData.LEGACY_DOMAIN) {
    return res.redirect(301, configData.ACTIVE_DOMAIN);
  }
  if (req.headers['x-forwarded-proto'] !== 'https' && ENV !== 'development') {
    return res.redirect(301, configData.ACTIVE_DOMAIN);
  }
  return next();
});

app.set('views', `${__dirname}/../views`);
app.set('view engine', 'pug');
app.use(express.static(`${__dirname}/../../deploy`));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(cookieParser());
app.use(session(
  {
    secret: configData.EXPRESS_SESSION_SECRET,
    resave: true,
    saveUninitialized: true
  }
));

/**
 * Redux helper functions
 */
function handleRender(req, res) {
  // Create a new Redux store instance
  const store = createStore(undoable(reducer, {
    debug: false
  }));

  // Dispatch initial state
  store.dispatch({
    type: 'SET_INITIAL_STATE',
    state: {}
  });
  store.dispatch({
    type: 'SHOW_SPINNER'
  });

  // Render the component to a string
  const html = renderToString(
    <Root store={store} />
  );

  const initialState = store.getState();

  // Send the rendered page back to the client
  res.render('index.pug', {
    reactOutput: html,
    initialState: JSON.stringify(initialState),
    googleAnalyticsId: configData.GOOGLE_ANALYTICS_ID
  });
}

/**
 * Twitter upload helper
 */
function tweetWithMedia(client, request, response, path) {
  // Tweet message and drawing
  let filePath = path;
  if (path.indexOf('images/tmp') === -1) {
    filePath = `${__dirname}/../../images/tmp/${path}`;
  }
  const data = fs.readFileSync(filePath);
  client.post('media/upload', { media: data }, (err, media) => {
    if (!err) {
      // If successful, a media object will be returned.
      const status = {
        status: request.session.cssData.text,
        media_ids: media.media_id_string // Pass the media id string
      };
      client.post('statuses/update', status, (e) => {
        if (!e) {
          // Success
          response.redirect('/');
        }
        fs.unlinkSync(filePath);
      });
    } else {
      fs.unlinkSync(filePath);
    }
  });
}

/**
 * Routes
 */
app.get('/', handleRender);

app.post('/auth/twitter', (req, res) => {
  oa.getOAuthRequestToken((error, oauthToken, oauthTokenSecret) => {
    if (error) {
      res.status(500).send('auth twitter: error');
    } else {
      try {
        const request = req;

        request.session.oauthRequestToken = oauthToken;
        request.session.oauthRequestTokenSecret = oauthTokenSecret;

        request.body.drawingData = JSON.parse(request.body.drawingData);
        request.session.cssData = request.body;

        res.contentType('application/json');
        const data = JSON.stringify(
          `https://twitter.com/oauth/authenticate?oauth_token=${oauthToken}`
        );
        res.header('Content-Length', data.length);
        res.end(data);
      } catch (e) {
        res.status(500).send('auth twitter: error');
      }
    }
  });
});

app.get('/auth/twitter/callback', (req, res, next) => {
  if (req.query) {
    oa.getOAuthAccessToken(
      req.session.oauthRequestToken,
      req.session.oauthRequestTokenSecret,
      req.query.oauth_verifier,
      (error, oauthAccessToken, oauthAccessTokenSecret) => {
        if (error) {
          res.send('auth twitter callback: error');
        } else {
          const request = req;
          const randomName = temp.path();
          const imgPath = `images${randomName}`;
          const client = new Twitter({
            consumer_key: configData.TWITTER_CONSUMER_KEY,
            consumer_secret: configData.TWITTER_CONSUMER_SECRET,
            access_token_key: oauthAccessToken,
            access_token_secret: oauthAccessTokenSecret
          });

          request.session.oauthAccessToken = oauthAccessToken;
          request.session.oauthAccessTokenSecret = oauthAccessTokenSecret;

          switch (request.session.cssData.type) {
            case 'animation':
              drawGif(request.session.cssData, imgPath, false, (gifPath) => {
                tweetWithMedia(client, request, res, gifPath);
              });
              break;
            case 'spritesheet':
              drawSpritesheet(request.session.cssData, imgPath, (spritesheetPath) => {
                tweetWithMedia(client, request, res, spritesheetPath);
              });
              break;
            default:
              drawFrame(request.session.cssData, imgPath, (singleFramePath) => {
                tweetWithMedia(client, request, res, singleFramePath);
              });
          }
        }
      }
    );
  } else {
    next(new Error('auth twitter callback: error'));
  }
});

app.post('/auth/download', (req, res) => {
  try {
    const requestBody = req.body;
    requestBody.drawingData = JSON.parse(requestBody.drawingData);

    const randomName = temp.path();
    const imgPath = `images${randomName}`;

    switch (requestBody.type) {
      case 'animation':
        drawGif(requestBody, imgPath, true, (gifPath) => {
          res.send({ fileUrl: `/download/tmp/${gifPath}` });
        });
        break;
      case 'spritesheet':
        drawSpritesheet(requestBody, imgPath, (spritesheetPath) => {
          res.send({ fileUrl: `/download/tmp/${spritesheetPath}` });
        });
        break;
      default:
        drawFrame(requestBody, imgPath, (singleFramePath) => {
          res.send({ fileUrl: `/download/tmp/${singleFramePath}` });
        });
    }
  } catch (e) {
    res.status(500).send('Download error');
  }
});

app.get('/download/tmp/:filename', (req, res) => {
  const filePath = `${__dirname}/../../images/tmp/${req.params.filename}`;

  // Stream and delete the file
  const stream = fs.createReadStream(filePath, { bufferSize: 64 * 1024 });
  stream.pipe(res);

  let hadError = false;
  stream.on('error', () => {
    hadError = true;
  });
  stream.on('close', () => {
    if (!hadError) fs.unlink(filePath, () => {});
  });
});

app.listen(process.env.PORT || PORTSERVER, () => {
  console.log(
    'Express server listening on port %d in %s mode',
    process.env.PORT || PORTSERVER, app.settings.env);
});
