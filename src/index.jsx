import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import reducer from './reducer';
import App from './components/App';
import {Map, fromJS} from 'immutable';
import undoable from 'redux-undo';

const store = createStore(undoable(reducer, {
  initialState: new Map({}),
  initTypes: ['@@redux/SET_INITIAL_STATE', '@@SET_INITIAL_STATE'], // history will be (re)set upon init action type
  initialHistory: {
  past: [],
  present: new Map({}),
  future: []
  },
  debug: true
}));

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
