import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import reducer from './reducer';
import {AppContainer} from './components/App';
import {Map, fromJS} from 'immutable';
import undoable, {includeAction} from 'redux-undo';

const store = createStore(undoable(reducer, {
  filter: includeAction([
    'SET_STATE',
    'SET_GRID_DIMENSION',
    'SET_GRID_CELL_VALUE',
    'SET_DRAWING',
    'SET_CELL_SIZE',
    'SET_RESET_GRID'
  ]),
  debug: true
}));

store.dispatch({
  type: 'SET_INITIAL_STATE',
  state: {}
});

ReactDOM.render(
  <Provider store={store}>
    <AppContainer />
  </Provider>,
  document.getElementById('app')
);
