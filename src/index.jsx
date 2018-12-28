import React from 'react';
import ReactDOM from 'react-dom';
import './css/imports.css'; // Import PostCSS files
import configureStore from './store/configureStore';
import Root from './components/Root';

const devMode = process.env.NODE_ENV === 'development';
const store = configureStore(devMode);

ReactDOM.render(<Root store={store} />, document.getElementById('app'));
