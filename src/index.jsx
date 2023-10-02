import React from 'react';
import ReactDOM from 'react-dom';
import ReactGA from 'react-ga';
import './css/imports.css';
import configureStore from './store/configureStore';
import Root from './components/Root';

const devMode = process.env.NODE_ENV === 'development';
const store = configureStore(devMode);

if (process.env.GOOGLE_ANALYTICS_ID) {
  ReactGA.initialize(process.env.GOOGLE_ANALYTICS_ID);
}
ReactDOM.render(<Root store={store} />, document.getElementById('app'));
