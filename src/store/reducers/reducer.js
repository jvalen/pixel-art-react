import { List, Map } from 'immutable';
import {
  createGrid, resizeGrid, createPalette, resetIntervals, setGridCellValue,
  checkColorInPalette, addColorToLastCellInPalette, getPositionFirstMatchInPalette,
  applyBucket, cloneGrid
} from './reducerHelpers';

const GRID_INITIAL_COLOR = '#313131';

function setInitialState(state) {
  const cellSize = 10;
  const columns = 20;
  const rows = 20;
  const currentColor = { color: '#000000', position: 0 };
  const frame = createGrid(columns * rows, GRID_INITIAL_COLOR, 100);
  const paletteGrid = createPalette();

  const initialState = {
    frames: [frame],
    paletteGridData: paletteGrid,
    cellSize,
    columns,
    rows,
    currentColor,
    initialColor: GRID_INITIAL_COLOR,
    eraserOn: false,
    eyedropperOn: false,
    colorPickerOn: false,
    bucketOn: false,
    loading: false,
    notifications: List(),
    activeFrameIndex: 0,
    duration: 1
  };

  return state.merge(initialState);
}

function changeDimensions(state, gridProperty, behaviour) {
  const framesCount = state.get('frames').size;
  const propertyValue = state.get(gridProperty);
  let newFrames = List();

  for (let i = 0; i < framesCount; i++) {
    newFrames = newFrames.push(
      Map(
        {
          grid:
            resizeGrid(
              state.getIn(['frames', i, 'grid']),
              gridProperty,
              behaviour,
              GRID_INITIAL_COLOR,
              { columns: state.get('columns'), rows: state.get('rows') }
            ),
          interval: state.getIn(['frames', i, 'interval']),
          key: state.getIn(['frames', i, 'key'])
        }
      )
    );
  }

  const newValues = {
    frames: newFrames
  };
  newValues[gridProperty] = parseInt(
    behaviour === 'add' ? propertyValue + 1 : propertyValue - 1,
    10
  );
  return state.merge(newValues);
}

function setColorSelected(state, newColorSelected, positionInPalette) {
  const newColor = { color: newColorSelected, position: positionInPalette };
  const newState = {
    eraserOn: false,
    eyedropperOn: false,
    colorPickerOn: false
  };
  let paletteGridData = state.get('paletteGridData');

  if (!checkColorInPalette(paletteGridData, newColorSelected)) {
    // If there is no newColorSelected in the palette it will create one
    paletteGridData = addColorToLastCellInPalette(
      paletteGridData, newColorSelected
    );
    newColor.position = paletteGridData.size - 1;
  } else if (positionInPalette === null) {
    // Eyedropper called this function, the color position is unknown
    newColor.position =
      getPositionFirstMatchInPalette(paletteGridData, newColorSelected);
  }
  newState.currentColor = newColor;
  newState.paletteGridData = paletteGridData;

  return state.merge(newState);
}

function setCustomColor(state, customColor) {
  const currentColor = state.get('currentColor');
  const paletteGridData = state.get('paletteGridData');
  const newState = {
    currentColor: {
      color: customColor,
      position: currentColor.get('position')
    }
  };

  if (!checkColorInPalette(paletteGridData, currentColor.get('color'))) {
    // If there is no colorSelected in the palette it will create one
    newState.paletteGridData = addColorToLastCellInPalette(
      paletteGridData, customColor
    );
    newState.currentColor.position = newState.paletteGridData.size - 1;
  } else {
    // There is a color selected in the palette
    newState.paletteGridData = paletteGridData.set(
      currentColor.get('position'), Map({
        color: customColor, id: currentColor.get('color')
      })
    );
  }

  return state.merge(newState);
}

function drawCell(state, id) {
  const bucketOn = state.get('bucketOn');
  const eyedropperOn = state.get('eyedropperOn');
  const eraserOn = state.get('eraserOn');

  if (bucketOn || eyedropperOn) {
    const activeFrameIndex = state.get('activeFrameIndex');
    const cellColor = state.getIn(
      ['frames', activeFrameIndex, 'grid', id, 'color']
    );

    if (eyedropperOn) {
      return setColorSelected(state, cellColor, null);
    }
    // bucketOn
    return applyBucket(state, activeFrameIndex, id, cellColor);
  }
  // eraserOn or regular cell paint
  const used = !eraserOn;
  const color = eraserOn ?
  state.get('initialColor') :
  state.get('currentColor').get('color');
  return setGridCellValue(state, color, used, id);
}

function setDrawing(state, frames, paletteGridData, cellSize, columns, rows) {
  return state.merge({
    frames,
    paletteGridData,
    cellSize,
    columns,
    rows,
    activeFrameIndex: 0
  });
}

function setEraser(state) {
  return state.merge({
    currentColor: { color: null, position: -1 },
    eraserOn: true,
    eyedropperOn: false,
    colorPickerOn: false,
    bucketOn: false
  });
}

function setBucket(state) {
  return state.merge({
    eraserOn: false,
    eyedropperOn: false,
    colorPickerOn: false,
    bucketOn: !state.get('bucketOn')
  });
}

function setEyedropper(state) {
  return state.merge({
    eraserOn: false,
    eyedropperOn: true,
    colorPickerOn: false,
    bucketOn: false
  });
}

function setColorPicker(state) {
  return state.merge({
    eraserOn: false,
    eyedropperOn: false,
    colorPickerOn: true,
    bucketOn: false
  });
}

function setCellSize(state, cellSize) {
  return state.merge({ cellSize });
}

function resetGrid(state, columns, rows, activeFrameIndex) {
  const currentInterval = state.get('frames').get(activeFrameIndex).get('interval');
  const newGrid = createGrid(
    parseInt(columns, 10) * parseInt(rows, 10),
    GRID_INITIAL_COLOR,
    currentInterval
  );

  return state.merge({
    frames: state.get('frames').update(activeFrameIndex, () => newGrid)
  });
}

function showSpinner(state) {
  return state.merge({ loading: true });
}

function hideSpinner(state) {
  return state.merge({ loading: false });
}

function sendNotification(state, message) {
  return state.merge({
    notifications: message === '' ? List() : List([{ message, id: 0 }])
  });
}

function changeActiveFrame(state, frameIndex) {
  return state.merge({ activeFrameIndex: frameIndex });
}

function createNewFrame(state) {
  const newFrames = state.get('frames').push(createGrid(
    parseInt(state.get('columns'), 10) * parseInt(state.get('rows'), 10),
    GRID_INITIAL_COLOR,
    100
  ));
  return state.merge({
    frames: resetIntervals(newFrames),
    activeFrameIndex: newFrames.size - 1
  });
}

function deleteFrame(state, frameId) {
  const activeFrameIndex = state.get('activeFrameIndex');
  const newState = {};
  let frames = state.get('frames');

  if (frames.size > 1) {
    const reduceFrameIndex =
      (activeFrameIndex >= frameId) &&
      (activeFrameIndex > 0);

    frames = frames.splice(frameId, 1);
    newState.frames = resetIntervals(frames);

    if (reduceFrameIndex) {
      newState.activeFrameIndex = frames.size - 1;
    }
  }
  return state.merge(newState);
}

function duplicateFrame(state, frameId) {
  const frames = state.get('frames');
  const prevFrame = frames.get(frameId);
  return state.merge({
    frames: resetIntervals(frames.splice(
      frameId, 0, cloneGrid(prevFrame.get('grid'), prevFrame.get('interval'))
    )),
    activeFrameIndex: frameId + 1
  });
}

function setDuration(state, duration) {
  return state.merge({ duration });
}

function changeFrameInterval(state, frameIndex, interval) {
  return state.merge({
    frames: state.get('frames').updateIn(
      [frameIndex, 'interval'],
      () => interval
     )
  });
}

export default function (state = Map(), action) {
  switch (action.type) {
    case 'SET_INITIAL_STATE':
      return setInitialState(state);
    case 'CHANGE_DIMENSIONS':
      return changeDimensions(state, action.gridProperty, action.behaviour);
    case 'SET_COLOR_SELECTED':
      return setColorSelected(
        state, action.newColorSelected, action.paletteColorPosition
      );
    case 'SET_CUSTOM_COLOR':
      return setCustomColor(state, action.customColor);
    case 'DRAW_CELL':
      return drawCell(state, action.id);
    case 'SET_DRAWING':
      return setDrawing(
        state, action.frames, action.paletteGridData,
        action.cellSize, action.columns, action.rows);
    case 'SET_ERASER':
      return setEraser(state);
    case 'SET_BUCKET':
      return setBucket(state);
    case 'SET_EYEDROPPER':
      return setEyedropper(state);
    case 'SET_COLOR_PICKER':
      return setColorPicker(state);
    case 'SET_CELL_SIZE':
      return setCellSize(state, action.cellSize);
    case 'SET_RESET_GRID':
      return resetGrid(
        state, action.columns, action.rows,
        action.activeFrameIndex);
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
    case 'SET_DURATION':
      return setDuration(state, action.duration);
    case 'CHANGE_FRAME_INTERVAL':
      return changeFrameInterval(state, action.frameIndex, action.interval);
    case 'NEW_PROJECT':
      return setInitialState(state);
    default:
  }
  return state;
}
