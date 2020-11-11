import { renderToString } from 'react-dom/server';
import undoable, { includeAction } from 'redux-undo';
import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import fs from 'fs';
import session from 'express-session';
import React from 'react';
import { createStore } from 'redux';
import reducer from '../store/reducers/reducer';
import pkgjson from '../../package.json';
import Root from '../components/Root';
import {
  SHOW_SPINNER,
  CHANGE_DIMENSIONS,
  NEW_PROJECT,
  SET_DRAWING,
  SET_CELL_SIZE,
  SET_RESET_GRID
} from '../store/actions/actionTypes';

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
app.use(
  session({
    secret: configData.EXPRESS_SESSION_SECRET,
    resave: true,
    saveUninitialized: true
  })
);

/**
 * Redux helper functions
 */
function renderHome(req, res) {
  // Create a new Redux store instance
  const store = createStore(
    undoable(reducer, {
      filter: includeAction([
        CHANGE_DIMENSIONS,
        SET_DRAWING,
        SET_CELL_SIZE,
        SET_RESET_GRID,
        NEW_PROJECT
      ]),
      debug: false,
      ignoreInitialState: true
    })
  );

  store.dispatch({
    type: SHOW_SPINNER
  });

  // Render the component to a string
  const html = renderToString(<Root store={store} />);

  const initialState = store.getState();

  // Send the rendered page back to the client
  res.render('index.pug', {
    reactOutput: html,
    initialState: JSON.stringify(initialState),
    googleAnalyticsId: configData.GOOGLE_ANALYTICS_ID
  });
}

function renderCookies(req, res) {
  res.render('cookies.pug', {
    googleAnalyticsId: configData.GOOGLE_ANALYTICS_ID
  });
}

/**
 * Routes
 */
app.get('/', renderHome);
app.get('/cookies', renderCookies);
app.use(function(req, res) {
  res.status(404).render('404.pug', {
    googleAnalyticsId: configData.GOOGLE_ANALYTICS_ID
  });
});

app.listen(process.env.PORT || PORTSERVER, () => {
  console.log(
    'Express server listening on port %d in %s mode',
    process.env.PORT || PORTSERVER,
    app.settings.env
  );
});
