/**
 * Module dependencies.
 */
import { renderToString } from 'react-dom/server'
import { Provider } from 'react-redux'
import undoable from 'redux-undo'
import reducer from './src/reducer'
import {AppContainer} from './src/components/App'
import gm from 'gm'
import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import temp from 'temp'
import fs from 'fs'
import path from 'path'
import Twitter from 'twitter'
import {OAuth} from 'oauth'
import session from 'express-session'
import React from 'react'
import { createStore } from 'redux'
import Jade from 'jade'
import {Map, fromJS} from 'immutable';

let app = module.exports = express(),
    configData,
    portServer = 3000;

/**
 * Configuration
 */
var env = process.env.NODE_ENV || 'development';
if ('development' == env) {
  configData = JSON.parse(fs.readFileSync('config.json', 'utf8')).dev;
} else {
  configData = process.env;
}

var oa = new OAuth(
      "https://api.twitter.com/oauth/request_token",
      "https://api.twitter.com/oauth/access_token",
      configData.TWITTER_CONSUMER_KEY,
      configData.TWITTER_CONSUMER_SECRET,
      "1.0A",
      configData.TWITTER_CALLBACK_URL,
      "HMAC-SHA1"
    );

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.static(__dirname + '/deploy'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({ secret: configData.EXPRESS_SESSION_SECRET, resave: true, saveUninitialized: true }));

/**
 * Routes
 */
app.get('/', handleRender);

app.post('/auth/twitter', function(req, res) {
  oa.getOAuthRequestToken(function(error, oauth_token, oauth_token_secret, results){
    if (error) {
      console.log(error);
      res.send("auth twitter: error")
    }
    else {
      // console.log(oauth_token);
      // console.log(oauth_token_secret);
      req.session.oauthRequestToken = oauth_token;
      req.session.oauthRequestTokenSecret = oauth_token_secret;
      req.session.cssData = req.body;

      res.contentType('application/json');
      var data = JSON.stringify('https://twitter.com/oauth/authenticate?oauth_token='+oauth_token);
      res.header('Content-Length', data.length);
      res.end(data);
    }
  });
});

app.get('/auth/twitter/callback', function(req, res, next){
  // console.log(">>" + req.session.oauthRequestToken);
  // console.log(">>" + req.session.oauthRequestTokenSecret);
  // console.log(">>" + req.query.oauth_verifier);

  if (req.query) {
    oa.getOAuthAccessToken(req.session.oauthRequestToken, req.session.oauthRequestTokenSecret, req.query.oauth_verifier,
    function(error, oauthAccessToken, oauthAccessTokenSecret, results){
      if (error){
        console.log(error);
        res.send("auth twitter callback: error");
      } else {
        req.session.oauthAccessToken = oauthAccessToken;
        req.session.oauthAccessTokenSecret = oauthAccessTokenSecret;

        var client = new Twitter({
          consumer_key: configData.TWITTER_CONSUMER_KEY,
          consumer_secret: configData.TWITTER_CONSUMER_SECRET,
          access_token_key: oauthAccessToken,
          access_token_secret: oauthAccessTokenSecret
        });

        var randomName = temp.path({suffix: '.png'}),
            imgPath = 'images' + randomName;

        drawFromCss(req.session.cssData, imgPath, function() {
          // Tweet message and drawing
          var data = require('fs').readFileSync(imgPath);
          client.post('media/upload', {media: data}, function(error, media, response){
            if (!error) {
              // If successful, a media object will be returned.
              var status = {
                status: req.session.cssData.text,
                media_ids: media.media_id_string // Pass the media id string
              }
              client.post('statuses/update', status, function(error, tweet, response){
                if (!error) {
                  // Success
                  console.log(tweet);
                  res.redirect('/')
                }
                fs.unlinkSync(imgPath);
              });
            } else {
              console.log(error);
              fs.unlinkSync(imgPath);
            }
          });
        });
      }
    }
    );
  } else
    next(new Error("auth twitter callback: error"))
});

app.listen(process.env.PORT || portServer, function(){
  console.log("Express server listening on port %d in %s mode", process.env.PORT || portServer, app.settings.env);
});

/**
 * Redux helper functions
 */
function handleRender(req, res) {
  // Create a new Redux store instance
  const store = createStore(undoable(reducer, {
    initTypes: ['@@redux/SET_INITIAL_STATE', '@@SET_INITIAL_STATE'], // history will be (re)set upon init action type
    debug: false
  }));

  //Dispatch initial state
  store.dispatch({
    type: 'SET_INITIAL_STATE',
    state: {}
  });

  // Render the component to a string
  const html = renderToString(
    <Provider store={store}>
      <AppContainer />
    </Provider>
  );

  // Send the rendered page back to the client
  res.render('index.jade', {reactOutput: html});
}

/**
 * Draw image with CSS data
 */
function drawFromCss(data, path, callback){
  var width = data.cols * data.pixelSize,
      height = data.rows * data.pixelSize,
      opacity = 0;

  data.boxShadow = data.boxShadow.map(function(elem){
    return (
      {
        x: elem[0],
        y:elem[1],
        color:elem[3]}
      )
    }
  );

  let gmImg = gm(width, height, '#000000' + ('0' + Math.round( (1 - opacity) * 255 ).toString(16)).slice(-2));

  for (var i = 0; i < data.boxShadow.length; i++) {
    var aux = data.boxShadow[i];
    gmImg.fill(aux.color).drawRectangle(
      aux.x - data.pixelSize, aux.y - data.pixelSize, aux.x, aux.y
    );
  }

  gmImg.write(
    path,
    function (err) {
      if (err) console.log(err);
      callback();
    }
  );
}
