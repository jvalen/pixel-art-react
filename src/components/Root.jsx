import React from 'react';
import { Provider } from 'react-redux';
import App from './App';

const Root = ({ store }) => (
  <Provider store={store}>
    <App dispatch={store.dispatch} />
  </Provider>
);

export default Root;
