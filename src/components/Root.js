import React from 'react';
import { Provider } from 'react-redux';
import AppContainer from './App';

const Root = ({ store }) => (
  <Provider store={store}>
    <AppContainer dispatch={store.dispatch} />
  </Provider>
);

export default Root;
