/**
 * Module dependencies.
 */
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import undoable from 'redux-undo';
import reducer from './src/reducer';
import { AppContainer } from './src/components/App';
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
import pkgjson from './package.json';
import {
  drawFrame,
  drawGif,
  drawSpritesheet
} from './src/utils/imageGeneration';

const app = module.exports = express();
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

app.set('views', `${__dirname}/views`);
app.set('view engine', 'pug');
app.use(express.static(`${__dirname}/deploy`));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
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
    <Provider store={store}>
      <AppContainer />
    </Provider>
  );

  const initialState = store.getState();

  // Send the rendered page back to the client
  res.render('index.pug', {
    reactOutput: html,
    initialState: JSON.stringify(initialState)
  });
}

/**
 * Twitter upload helper
 */
function tweetWithMedia(client, request, response, path) {
  // Tweet message and drawing
  let filePath = path;
  if (path.indexOf('images/tmp') === -1) {
    filePath = `${__dirname}/images/tmp/${path}`;
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
      res.send('auth twitter: error');
    } else {
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

          let suffix = '.png';
          if (request.session.cssData.type === 'animation') {
            suffix = '.gif';
          }

          const randomName = temp.path({ suffix });
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
              drawFrame(request.session.cssData, imgPath, () => {
                tweetWithMedia(client, request, res, imgPath);
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
  const request = req;

  let suffix = '.png';
  if (request.body.type === 'animation') {
    suffix = '.gif';
  }

  const randomName = temp.path({ suffix });
  const imgPath = `images${randomName}`;

  request.body.drawingData = JSON.parse(request.body.drawingData);

  switch (request.body.type) {
    case 'animation':
      drawGif(request.body, imgPath, true, (gifPath) => {
        res.send(`/download/tmp/${gifPath}`);
      });
      break;
    case 'spritesheet':
      drawSpritesheet(request.body, imgPath, (spritesheetPath) => {
        res.send(`/download/tmp/${spritesheetPath}`);
      });
      break;
    default:
      drawFrame(request.body, imgPath, () => {
        res.send(`/download${randomName}`);
      });
  }
});

app.get('/download/tmp/:filename', (req, res) => {
  // console.log(`downloaded file: ${req.params.filename}`);
  const filePath = `${__dirname}/images/tmp/${req.params.filename}`;

  // Stream and delete the file
  const stream = fs.createReadStream(filePath, { bufferSize: 64 * 1024 });
  stream.pipe(res);

  let hadError = false;
  stream.on('error', () => {
    hadError = true;
  });
  stream.on('close', () => {
    if (!hadError) fs.unlink(filePath);
  });
});

app.listen(process.env.PORT || PORTSERVER, () => {
  console.log(
    'Express server listening on port %d in %s mode',
    process.env.PORT || PORTSERVER, app.settings.env);
});
