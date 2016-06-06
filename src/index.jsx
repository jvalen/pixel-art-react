import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { AppContainer } from './components/App';
import './css/imports.css'; // Import PostCSS files
import Perf from 'react-addons-perf';
import configureStore from './store/configureStore';

const devMode = process.env.NODE_ENV === 'development';
if (devMode) {
  window.Perf = Perf; // Expose react-addons-perf for dev purposes
}

const store = configureStore(devMode);

ReactDOM.render(
  <Provider store={store}>
    <AppContainer />
  </Provider>,
  document.getElementById('app')
);
