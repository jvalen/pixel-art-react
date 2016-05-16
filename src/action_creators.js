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

export function setDrawing(frames, paletteGridData, cellSize, columns, rows) {
  return {
    type: 'SET_DRAWING',
    frames,
    paletteGridData,
    cellSize,
    columns,
    rows
  };
}

export function startDrag() {
  return {
    type: 'START_DRAG'
  };
}

export function endDrag() {
  return {
    type: 'END_DRAG'
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

export function resetGrid(columns, rows, activeFrameIndex) {
  return {
    type: 'SET_RESET_GRID',
    columns,
    rows,
    activeFrameIndex
  };
}

export function showSpinner() {
  return {
    type: 'SHOW_SPINNER'
  };
}

export function hideSpinner() {
  return {
    type: 'HIDE_SPINNER'
  };
}

export function sendNotification(message) {
  return {
    type: 'SEND_NOTIFICATION',
    message
  };
}

export function changeActiveFrame(frameIndex) {
  return {
    type: 'CHANGE_ACTIVE_FRAME',
    frameIndex
  };
}

export function createNewFrame() {
  return {
    type: 'CREATE_NEW_FRAME'
  };
}

export function deleteFrame(frameId) {
  return {
    type: 'DELETE_FRAME',
    frameId
  };
}

export function duplicateFrame(frameId) {
  return {
    type: 'DUPLICATE_FRAME',
    frameId
  };
}

export function undo() {
  return (ActionCreators.undo());
}

export function redo() {
  return (ActionCreators.redo());
}
