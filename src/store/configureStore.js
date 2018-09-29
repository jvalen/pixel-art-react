import { createStore } from 'redux';
import undoable, { includeAction } from 'redux-undo';
import { fromJS } from 'immutable';
import reducer from '../store/reducers/reducer';
import {
  SET_INITIAL_STATE,
  CHANGE_DIMENSIONS,
  APPLY_PENCIL,
  APPLY_ERASER,
  APPLY_BUCKET,
  APPLY_EYEDROPPER,
  SHOW_SPINNER,
  NEW_PROJECT,
  SET_DRAWING,
  SET_CELL_SIZE,
  SET_RESET_GRID
} from '../store/actions/actionTypes';

const createIncludedActions = () => includeAction([
  CHANGE_DIMENSIONS,
  APPLY_PENCIL,
  APPLY_ERASER,
  APPLY_BUCKET,
  APPLY_EYEDROPPER,
  SET_DRAWING,
  SET_CELL_SIZE,
  SET_RESET_GRID,
  NEW_PROJECT
]);

const configureStore = (devMode) => {
  let store;
  if (devMode) {
    store = createStore(undoable(reducer, {
      filter: createIncludedActions(),
      debug: true
    }));

    /*
      In production mode, the following actions are already dispatched
      (Isomorphic app)
    */
    store.dispatch({
      type: SET_INITIAL_STATE,
      state: {}
    });
    store.dispatch({
      type: SHOW_SPINNER
    });
  } else {
    // Collects initial state created in the server side
    const initialState = window.__INITIAL_STATE__;

    /* Make immutable the initial state */
    initialState.present = fromJS(initialState.present);
    initialState.past = initialState.past.map(item => fromJS(item));

    store = createStore(undoable(reducer, {
      filter: createIncludedActions(),
      debug: false
    }), initialState);
  }

  return store;
};

export default configureStore;
