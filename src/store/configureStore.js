import { createStore } from 'redux';
import undoable, { includeAction } from 'redux-undo';
import { fromJS } from 'immutable';
import reducer from '../store/reducers/reducer';
import {
  CHANGE_DIMENSIONS,
  DRAW_CELL,
  SHOW_SPINNER,
  NEW_PROJECT,
  SET_DRAWING,
  SET_CELL_SIZE,
  SET_RESET_GRID
} from '../store/actions/actionTypes';

const configureStore = (devMode) => {
  let store;
  if (devMode) {
    store = createStore(undoable(reducer, {
      filter: includeAction([
        CHANGE_DIMENSIONS,
        DRAW_CELL,
        SET_DRAWING,
        SET_CELL_SIZE,
        SET_RESET_GRID,
        NEW_PROJECT
      ]),
      debug: true,
      ignoreInitialState: true
    }));

    store.dispatch({
      type: SHOW_SPINNER
    });
  } else {
    const initialState = window.__INITIAL_STATE__;
    initialState.present = fromJS(initialState.present);

    store = createStore(undoable(reducer, {
      filter: includeAction([
        CHANGE_DIMENSIONS,
        DRAW_CELL,
        SET_DRAWING,
        SET_CELL_SIZE,
        SET_RESET_GRID,
        NEW_PROJECT
      ]),
      debug: false,
      ignoreInitialState: true
    }), initialState);
  }

  return store;
};

export default configureStore;
