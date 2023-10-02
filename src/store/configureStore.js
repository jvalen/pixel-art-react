import { createStore } from 'redux';
import undoable, { includeAction } from 'redux-undo';
import reducer from './reducers/reducer';
import {
  CHANGE_DIMENSIONS,
  APPLY_PENCIL,
  APPLY_ERASER,
  APPLY_BUCKET,
  APPLY_EYEDROPPER,
  MOVE_DRAWING,
  SHOW_SPINNER,
  NEW_PROJECT,
  SET_DRAWING,
  SET_CELL_SIZE,
  SET_RESET_GRID
} from './actions/actionTypes';

const createIncludedActions = () =>
  includeAction([
    CHANGE_DIMENSIONS,
    APPLY_PENCIL,
    APPLY_ERASER,
    APPLY_BUCKET,
    APPLY_EYEDROPPER,
    MOVE_DRAWING,
    SET_DRAWING,
    SET_CELL_SIZE,
    SET_RESET_GRID,
    NEW_PROJECT
  ]);

const configureStore = devMode => {
  const store = createStore(
    undoable(reducer, {
      filter: createIncludedActions(),
      debug: devMode,
      ignoreInitialState: true
    })
  );

  store.dispatch({
    type: SHOW_SPINNER
  });

  return store;
};

export default configureStore;
