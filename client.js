import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import reducer from './src/reducer';
import {AppContainer} from './src/components/App';
import {Map, fromJS} from 'immutable';
import undoable, {includeAction} from 'redux-undo';

let initialState = window.__INITIAL_STATE__;

/* Make immutable initial state from server side */
initialState.present = fromJS(initialState.present);
initialState.past = initialState.past.map(function(item){
  return fromJS(item);
});

const store = createStore(undoable(reducer, {
  filter: includeAction([
    'SET_STATE',
    'SET_GRID_DIMENSION',
    'SET_GRID_CELL_VALUE',
    'SET_DRAWING',
    'SET_CELL_SIZE',
    'SET_RESET_GRID'
  ]),
  debug: false
}), initialState);

ReactDOM.render(
  <Provider store={store}>
    <AppContainer />
  </Provider>,
  document.getElementById('app')
);
