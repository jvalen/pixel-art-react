import { Map, fromJS } from 'immutable';

const GRID_INITIAL_COLOR = '313131';

/*
 * Helpers
 */
export function createGrid(cellsCount, initialColor, createGamma) {
  const newGrid = [];

  if (createGamma) {
    // Create colors gamma
    for (let i = 0; i <= cellsCount; i += 42) {
      const hex = ((0xe000 | i).toString(16)).slice(1);
      newGrid.push({ color: hex });
    }
  } else {
    // Set every cell with the initial color
    for (let i = 0; i < cellsCount; i++) {
      newGrid.push({ color: initialColor, used: false });
    }
  }

  return newGrid;
}

function checkColorInPalette(palette, color) {
  const sameColors = palette.filter((currentColor) => {
    return (currentColor.color === color);
  });
  return (sameColors.length > 0);
}

function addColorToLastCellInPalette(palette, newColor) {
  return palette.map((currentColor, i, collection) => {
    if (i === collection.length - 1) {
      // Last cell
      return ({ color: newColor });
    }
    return ({ color: currentColor.color });
  });
}

/* Action methods */

function setInitialState(state) {
  // Create initial frame
  const cellSize = 10;
  const columns = 20;
  const rows = 20;
  const currentColor = '000';
  const pixelGrid = createGrid(columns * rows, GRID_INITIAL_COLOR);
  const paletteGrid = createGrid(4095, GRID_INITIAL_COLOR, true);
  const dragging = false;

  const initialState = {
    frames: [pixelGrid],
    paletteGridData: paletteGrid,
    cellSize,
    columns,
    rows,
    currentColor,
    initialColor: GRID_INITIAL_COLOR,
    eraserOn: false,
    eyedropperOn: false,
    colorPickerOn: false,
    loading: false,
    notifications: [],
    dragging,
    activeFrameIndex: 0
  };

  return state.merge(initialState);
}

function setGridDimension(state, columns, rows, cellSize) {
  const newState = state.toJS();
  newState.frames[newState.activeFrameIndex] = createGrid(
    parseInt(columns, 10) * parseInt(rows, 10),
    GRID_INITIAL_COLOR
  );
  newState.rows = parseInt(rows, 10);
  newState.columns = parseInt(columns, 10);
  newState.cellSize = parseInt(cellSize, 10);

  return fromJS(newState);
}

function startDrag(state) {
  return state.merge({ dragging: true });
}
function endDrag(state) {
  return state.merge({ dragging: false });
}
function setColorSelected(state, newColorSelected) {
  const newState = {
    currentColor: newColorSelected,
    eraserOn: false,
    eyedropperOn: false,
    colorPickerOn: false
  };
  const paletteGridData = state.get('paletteGridData').toJS();

  if (!checkColorInPalette(paletteGridData, newColorSelected)) {
    // If there is no newColorSelected in the palette it will create one
    newState.paletteGridData =
      addColorToLastCellInPalette(paletteGridData, newColorSelected);
  }

  return state.merge(newState);
}

function setCustomColor(state, customColor) {
  const currentColor = state.get('currentColor');
  const paletteGridData = state.get('paletteGridData').toJS();
  const newState = {
    currentColor: customColor
  };

  if (!checkColorInPalette(paletteGridData, currentColor)) {
    // If there is no colorSelected in the palette it will create one
    newState.paletteGridData =
      addColorToLastCellInPalette(paletteGridData, customColor);
  } else {
    newState.paletteGridData = paletteGridData.map((paletteColor) => {
      if (paletteColor.color === currentColor) {
        return Map({ color: customColor });
      }
      return paletteColor;
    });
  }


  return state.merge(newState);
}

function setGridCellValue(state, color, used, id) {
  return state.setIn(
    ['frames', state.get('activeFrameIndex'), parseInt(id, 10)],
    { color, used }
  );
}

function setDrawing(state, frames, paletteGridData, cellSize, columns, rows) {
  const newState = state.toJS();
  newState.frames = frames;
  newState.paletteGridData = paletteGridData;
  newState.cellSize = cellSize;
  newState.columns = columns;
  newState.rows = rows;
  newState.activeFrameIndex = 0;

  return fromJS(newState);
}

function setEraser(state) {
  const newState = {
    currentColor: null,
    eraserOn: true,
    eyedropperOn: false,
    colorPickerOn: false
  };

  return state.merge(newState);
}

function setEyedropper(state) {
  const newState = {
    eraserOn: false,
    eyedropperOn: true,
    colorPickerOn: false
  };

  return state.merge(newState);
}

function setColorPicker(state) {
  const newState = {
    eraserOn: false,
    eyedropperOn: false,
    colorPickerOn: true
  };

  return state.merge(newState);
}

function setCellSize(state, cellSize) {
  const newState = {
    cellSize
  };

  return state.merge(newState);
}

function resetGrid(state, columns, rows, activeFrameIndex) {
  const newState = state.toJS();
  newState.frames[activeFrameIndex] = createGrid(
    parseInt(columns, 10) * parseInt(rows, 10),
    GRID_INITIAL_COLOR
  );

  return fromJS(newState);
}

function showSpinner(state) {
  const newState = { loading: true };

  return state.merge(newState);
}

function hideSpinner(state) {
  const newState = { loading: false };

  return state.merge(newState);
}

function sendNotification(state, message) {
  const newState = {
    notifications: message === '' ? [] : [message]
  };

  return state.merge(newState);
}

function changeActiveFrame(state, frameIndex) {
  const newState = {
    activeFrameIndex: frameIndex
  };

  return state.merge(newState);
}

function createNewFrame(state) {
  const newState = state.toJS();
  newState.frames.push(createGrid(
    parseInt(newState.columns, 10) * parseInt(newState.rows, 10),
    GRID_INITIAL_COLOR
  ));
  newState.activeFrameIndex = newState.frames.length - 1;
  return fromJS(newState);
}

function deleteFrame(state, frameId) {
  if (state.get('frames').size > 1) {
    const newState = state.toJS();
    const reduceFrameIndex =
    (newState.activeFrameIndex >= frameId) && (newState.activeFrameIndex > 0);

    newState.frames.splice(frameId, 1);

    if (reduceFrameIndex) {
      newState.activeFrameIndex = newState.frames.length - 1;
    }
    return fromJS(newState);
  }
  return state;
}

function duplicateFrame(state, frameId) {
  const newState = state.toJS();

  newState.frames.splice(frameId, 0, newState.frames[frameId]);
  newState.activeFrameIndex = frameId + 1;

  return fromJS(newState);
}

export default function (state = Map(), action) {
  switch (action.type) {
    case 'SET_INITIAL_STATE':
      return setInitialState(state);
    case 'SET_GRID_DIMENSION':
      return setGridDimension(state, action.columns, action.rows, action.cellSize);
    case 'SET_COLOR_SELECTED':
      return setColorSelected(state, action.newColorSelected);
    case 'SET_CUSTOM_COLOR':
      return setCustomColor(state, action.customColor);
    case 'SET_GRID_CELL_VALUE':
      return setGridCellValue(state, action.color, action.used, action.id);
    case 'SET_DRAWING':
      return setDrawing(
        state, action.frames, action.paletteGridData,
        action.cellSize, action.columns, action.rows)
      ;
    case 'START_DRAG':
      return startDrag(state);
    case 'END_DRAG':
      return endDrag(state);
    case 'SET_ERASER':
      return setEraser(state);
    case 'SET_EYEDROPPER':
      return setEyedropper(state);
    case 'SET_COLOR_PICKER':
      return setColorPicker(state);
    case 'SET_CELL_SIZE':
      return setCellSize(state, action.cellSize);
    case 'SET_RESET_GRID':
      return resetGrid(state, action.columns, action.rows, action.activeFrameIndex);
    case 'SHOW_SPINNER':
      return showSpinner(state);
    case 'HIDE_SPINNER':
      return hideSpinner(state);
    case 'SEND_NOTIFICATION':
      return sendNotification(state, action.message);
    case 'CHANGE_ACTIVE_FRAME':
      return changeActiveFrame(state, action.frameIndex);
    case 'CREATE_NEW_FRAME':
      return createNewFrame(state);
    case 'DELETE_FRAME':
      return deleteFrame(state, action.frameId);
    case 'DUPLICATE_FRAME':
      return duplicateFrame(state, action.frameId);
    default:
  }
  return state;
}
