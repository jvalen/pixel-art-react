import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import reducer from './reducer';
import App from './components/App';
import {fromJS} from 'immutable';

const store = createStore(reducer, fromJS({}));
store.dispatch({
  type: 'SET_INITIAL_STATE',
  state: {}
});

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
);
