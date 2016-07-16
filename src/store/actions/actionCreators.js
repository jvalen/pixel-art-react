import { ActionCreators } from 'redux-undo';

export function setInitialState() {
  return {
    type: 'SET_INITIAL_STATE'
  };
}

export function changeDimensions(gridProperty, behaviour) {
  return {
    type: 'CHANGE_DIMENSIONS',
    gridProperty,
    behaviour
  };
}

export function setGridDimension(columns, rows) {
  return {
    type: 'SET_GRID_DIMENSION',
    columns,
    rows
  };
}

export function setColorSelected(newColorSelected, paletteColorPosition) {
  return {
    type: 'SET_COLOR_SELECTED',
    newColorSelected,
    paletteColorPosition
  };
}

export function setCustomColor(customColor) {
  return {
    type: 'SET_CUSTOM_COLOR',
    customColor
  };
}

export function drawCell(id) {
  return {
    type: 'DRAW_CELL',
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

export function setBucket() {
  return {
    type: 'SET_BUCKET'
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

export function setDuration(duration) {
  return {
    type: 'SET_DURATION',
    duration
  };
}

export function changeFrameInterval(frameIndex, interval) {
  return {
    type: 'CHANGE_FRAME_INTERVAL',
    frameIndex,
    interval
  };
}

export function newProject() {
  return {
    type: 'NEW_PROJECT'
  };
}

export function undo() {
  return (ActionCreators.undo());
}

export function redo() {
  return (ActionCreators.redo());
}
