import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import reducer from './src/reducer';
import {AppContainer} from './src/components/App';
import {Map, fromJS} from 'immutable';
import undoable from 'redux-undo';

let initialState = window.__INITIAL_STATE__;

/* Make immutable initial state from server side */
initialState.present = fromJS(initialState.present);
initialState.past = initialState.past.map(function(item){
  return fromJS(item);
});

const store = createStore(undoable(reducer, {
  initTypes: ['@@redux/SET_INITIAL_STATE', '@@SET_INITIAL_STATE'], // history will be (re)set upon init action type
  debug: false
}), initialState);

ReactDOM.render(
  <Provider store={store}>
    <AppContainer />
  </Provider>,
  document.getElementById('app')
);
