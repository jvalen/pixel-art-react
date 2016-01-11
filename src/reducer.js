import {Map, toJS} from 'immutable';

const GRID_INITIAL_COLOR = '313131';

/*
 * Helpers
 */
export function createGrid(cellsCount, initialColor, createGamma) {
  let newGrid = [];

  if (createGamma) {
    // Create colors gamma
    for(var i = 0; i <= cellsCount ; i += 42) {
      let hex = ((0xe000|i).toString(16)).slice(1);
      newGrid.push({color: hex});
    }
  } else {
    //Set every cell with the initial color
    for (var i = 0; i < cellsCount; i++) {
      newGrid.push({color: initialColor, used: false});
    }
  }

  return newGrid;
}

function checkColorInPalette(palette, color) {
  let sameColors = palette.filter(function(currentColor) {
    return (currentColor.color === color);
  });
  return (sameColors.length > 0);
}

function addColorToLastCellInPalette(palette, newColor) {
  return palette.map(function(currentColor, i, collection) {
    if (i === collection.length - 1) {
      //Last cell
      return ({color: newColor});
    } else {
      return ({color: currentColor.color});
    }
  });
}

/* Action methods */

function setInitialState(state, newState) {
  //Create initial grid
  let cellSize = 10,
      columns = 20,
      rows = 20,
      padding = 0.1,
      currentColor = '000',
      pixelGrid = createGrid(columns * rows, GRID_INITIAL_COLOR),
      paletteGrid = createGrid(4095, GRID_INITIAL_COLOR, true);

  let initialState = {
    grid: pixelGrid,
    paletteGridData: paletteGrid,
    cellSize: cellSize,
    columns: columns,
    rows: rows,
    padding: padding,
    currentColor: currentColor,
    initialColor: GRID_INITIAL_COLOR,
    eraserOn: false,
    eyedropperOn: false,
    colorPickerOn: false,
    loading: true,
    notifications: []
  };

  return state.merge(initialState);
}

function setGridDimension(state, columns, rows, cellSize) {
  let newState = {
    grid: createGrid(columns * rows, GRID_INITIAL_COLOR),
    rows: parseInt(rows, 10),
    columns: parseInt(columns, 10),
    cellSize: parseInt(cellSize, 10)
  }

  return state.merge(newState);
}

function setColorSelected(state, newColorSelected) {
  let newState = {
    currentColor: newColorSelected,
    eraserOn: false,
    eyedropperOn: false,
    colorPickerOn: false
    },
    paletteGridData = state.get('paletteGridData').toJS();

  if (!checkColorInPalette(paletteGridData, newColorSelected)) {
    //If there is no newColorSelected in the palette it will create one
    newState.paletteGridData =
      addColorToLastCellInPalette(paletteGridData, newColorSelected);
  }

  return state.merge(newState);
}

function setCustomColor(state, customColor) {
  let currentColor = state.get('currentColor'),
      paletteGridData = state.get('paletteGridData').toJS();

  let newState = {
    currentColor: customColor
  };

  if (!checkColorInPalette(paletteGridData, currentColor)) {
    //If there is no colorSelected in the palette it will create one
    newState.paletteGridData =
      addColorToLastCellInPalette(paletteGridData, customColor);
  } else {
    newState.paletteGridData = paletteGridData.map((paletteColor) => {
      if(paletteColor.color === currentColor) {
        return Map({color: customColor});
      } else {
        return paletteColor;
      }
    });
  }


  return state.merge(newState);
}

function setGridCellValue(state, color, used, id) {
  return state.setIn(['grid', parseInt(id, 10)], {
    color: color,
    used: used
  });
}

function setDrawing(state, grid, paletteGridData, cellSize, columns, rows) {
  let newState = {
    grid: grid,
    paletteGridData: paletteGridData,
    cellSize: cellSize,
    columns: columns,
    rows: rows,
  };

  return state.merge(newState);
}

function setEraser(state) {
  let newState = {
    currentColor: null,
    eraserOn: true,
    eyedropperOn: false,
    colorPickerOn: false
  };

  return state.merge(newState);
}

function setEyedropper(state) {
  let newState = {
    eraserOn: false,
    eyedropperOn: true,
    colorPickerOn: false
  };

  return state.merge(newState);
}

function setColorPicker(state) {
  let newState = {
    eraserOn: false,
    eyedropperOn: false,
    colorPickerOn: true
  };

  return state.merge(newState);
}

function setCellSize(state, cellSize) {
  let newState = {
    cellSize: cellSize
  };

  return state.merge(newState);
}

function resetGrid(state, columns, rows) {
  let newState = {
    grid: createGrid(
      parseInt(columns, 10) * parseInt(rows, 10),
      GRID_INITIAL_COLOR
    )
  };

  return state.merge(newState);
}

function showSpinner(state, columns, rows) {
  let newState = {loading: true};

  return state.merge(newState);
}

function hideSpinner(state, columns, rows) {
  let newState = {loading: false};

  return state.merge(newState);
}

function sendNotification(state, message) {
  let newState = {
    notifications: message === '' ? [] : [message]
  };

  return state.merge(newState);
}

export default function(state = Map(), action) {
  switch (action.type) {
  case 'SET_INITIAL_STATE':
    return setInitialState(state, action.state);
  case 'SET_GRID_DIMENSION':
    return setGridDimension(state, action.columns, action.rows, action.cellSize);
  case 'SET_COLOR_SELECTED':
    return setColorSelected(state, action.newColorSelected);
  case 'SET_CUSTOM_COLOR':
    return setCustomColor(state, action.customColor);
  case 'SET_GRID_CELL_VALUE':
    return setGridCellValue(state, action.color, action.used, action.id);
  case 'SET_DRAWING':
    return setDrawing(state, action.grid, action.paletteGridData, action.cellSize, action.columns, action.rows);
  case 'SET_ERASER':
    return setEraser(state);
  case 'SET_EYEDROPPER':
    return setEyedropper(state);
  case 'SET_COLOR_PICKER':
    return setColorPicker(state);
  case 'SET_CELL_SIZE':
    return setCellSize(state, action.cellSize);
  case 'SET_RESET_GRID':
    return resetGrid(state, action.columns, action.rows);
  case 'SHOW_SPINNER':
    return showSpinner(state);
  case 'HIDE_SPINNER':
    return hideSpinner(state);
  case 'SEND_NOTIFICATION':
    return sendNotification(state, action.message);
  }
  return state;
}
