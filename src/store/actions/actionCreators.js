import { ActionCreators } from 'redux-undo';
import * as types from './actionTypes';

export function setInitialState() {
  return {
    type: types.SET_INITIAL_STATE
  };
}

export function changeDimensions(gridProperty, behaviour) {
  return {
    type: types.CHANGE_DIMENSIONS,
    gridProperty,
    behaviour
  };
}

export function setGridDimension(columns, rows) {
  return {
    type: types.SET_GRID_DIMENSION,
    columns,
    rows
  };
}

export function setColorSelected(newColorSelected, paletteColorPosition) {
  return {
    type: types.SET_COLOR_SELECTED,
    newColorSelected,
    paletteColorPosition
  };
}

export function setCustomColor(customColor) {
  return {
    type: types.SET_CUSTOM_COLOR,
    customColor
  };
}

export function drawCell(id) {
  return {
    type: types.DRAW_CELL,
    id
  };
}

export function setDrawing(frames, paletteGridData, cellSize, columns, rows) {
  return {
    type: types.SET_DRAWING,
    frames,
    paletteGridData,
    cellSize,
    columns,
    rows
  };
}

export function endDrag() {
  return {
    type: types.END_DRAG
  };
}

export function setEraser() {
  return {
    type: types.SET_ERASER
  };
}

export function setBucket() {
  return {
    type: types.SET_BUCKET
  };
}

export function setEyedropper() {
  return {
    type: types.SET_EYEDROPPER
  };
}

export function setColorPicker() {
  return {
    type: types.SET_COLOR_PICKER
  };
}

export function setCellSize(cellSize) {
  return {
    type: types.SET_CELL_SIZE,
    cellSize
  };
}

export function resetGrid(columns, rows, activeFrameIndex) {
  return {
    type: types.SET_RESET_GRID,
    columns,
    rows,
    activeFrameIndex
  };
}

export function showSpinner() {
  return {
    type: types.SHOW_SPINNER
  };
}

export function hideSpinner() {
  return {
    type: types.HIDE_SPINNER
  };
}

export function sendNotification(message) {
  return {
    type: types.SEND_NOTIFICATION,
    message
  };
}

export function changeActiveFrame(frameIndex) {
  return {
    type: types.CHANGE_ACTIVE_FRAME,
    frameIndex
  };
}

export function createNewFrame() {
  return {
    type: types.CREATE_NEW_FRAME
  };
}

export function deleteFrame(frameId) {
  return {
    type: types.DELETE_FRAME,
    frameId
  };
}

export function duplicateFrame(frameId) {
  return {
    type: types.DUPLICATE_FRAME,
    frameId
  };
}

export function setDuration(duration) {
  return {
    type: types.SET_DURATION,
    duration
  };
}

export function changeFrameInterval(frameIndex, interval) {
  return {
    type: types.CHANGE_FRAME_INTERVAL,
    frameIndex,
    interval
  };
}

export function newProject() {
  return {
    type: types.NEW_PROJECT
  };
}

export function undo() {
  return (ActionCreators.undo());
}

export function redo() {
  return (ActionCreators.redo());
}
