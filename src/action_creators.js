import { ActionCreators } from 'redux-undo';

export function setState(state) {
  return {
    type: 'SET_STATE',
    state
  };
}

export function setGridDimension(columns, rows, cellSize) {
  return {
    type: 'SET_GRID_DIMENSION',
    columns,
    rows,
    cellSize
  };
}

export function setColorSelected(newColorSelected) {
  return {
    type: 'SET_COLOR_SELECTED',
    newColorSelected
  };
}

export function setCustomColor(customColor) {
  return {
    type: 'SET_CUSTOM_COLOR',
    customColor
  };
}

export function setGridCellValue(color, used, id) {
  return {
    type: 'SET_GRID_CELL_VALUE',
    color,
    used,
    id
  };
}

export function setDrawing(grid, cellSize, columns, rows) {
  return {
    type: 'SET_DRAWING',
    grid,
    cellSize,
    columns,
    rows
  };
}

export function setEraser() {
  return {
    type: 'SET_ERASER'
  };
}

export function setEyedropper() {
  return {
    type: 'SET_EYEDROPPER'
  };
}

export function setColorPicker() {
  return {
    type: 'SET_COLOR_PICKER'
  };
}

export function setCellSize(cellSize) {
  return {
    type: 'SET_CELL_SIZE',
    cellSize
  };
}

export function resetGrid(columns, rows) {
  return {
    type: 'SET_RESET_GRID',
    columns,
    rows
  };
}

export function showSpinner() {
  return {
    type: 'SHOW_SPINNER'
  };
}

export function undo() {
  return (ActionCreators.undo());
}

export function redo() {
  return (ActionCreators.redo());
}
