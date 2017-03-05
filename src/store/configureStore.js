import { createStore } from 'redux';
import undoable, { includeAction } from 'redux-undo';
import { fromJS } from 'immutable';
import reducer from '../store/reducers/reducer';

const configureStore = (devMode) => {
  let store;
  if (devMode) {
    store = createStore(undoable(reducer, {
      filter: includeAction([
        'CHANGE_DIMENSIONS',
        'DRAW_CELL',
        'SET_DRAWING',
        'SET_CELL_SIZE',
        'SET_RESET_GRID',
        'NEW_PROJECT'
      ]),
      debug: true
    }));

    /*
      In production mode, the following actions are already dispatched
      (Isomorphic app)
    */
    store.dispatch({
      type: 'SET_INITIAL_STATE',
      state: {}
    });
    store.dispatch({
      type: 'SHOW_SPINNER'
    });
  } else {
    // Collects initial state created in the server side
    const initialState = window.__INITIAL_STATE__;

    /* Make immutable the initial state */
    initialState.present = fromJS(initialState.present);
    initialState.past = initialState.past.map(item => fromJS(item));

    store = createStore(undoable(reducer, {
      filter: includeAction([
        'CHANGE_DIMENSIONS',
        'DRAW_CELL',
        'SET_DRAWING',
        'SET_CELL_SIZE',
        'SET_RESET_GRID',
        'NEW_PROJECT'
      ]),
      debug: false
    }), initialState);
  }

  return store;
};

export default configureStore;
