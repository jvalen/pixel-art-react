import * as actionCreators from '../store/actions/actionCreators';
import { initStorage, getDataFromStorage } from './storage';

/*
  Initial actions to dispatch:
  1. Hide spinner
  2. Load a project if there is a current one
*/
const initialSetup = (dispatch, storage) => {
  dispatch(actionCreators.hideSpinner());

  const dataStored = getDataFromStorage(storage);
  if (dataStored) {
    // Load current project from the storage
    const currentProjectIndex = dataStored.current;
    if (currentProjectIndex >= 0) {
      const {
        frames,
        paletteGridData,
        columns,
        rows,
        cellSize
      } = dataStored.stored[currentProjectIndex];

      dispatch(
        actionCreators.setDrawing(
          frames,
          paletteGridData,
          cellSize,
          columns,
          rows
        )
      );
    }
  } else {
    // If no data initialize storage
    initStorage(storage);
  }
};

export default initialSetup;
