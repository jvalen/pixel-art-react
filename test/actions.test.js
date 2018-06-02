import * as actions from '../src/store/actions/actionCreators';
import * as types from '../src/store/actions/actionTypes';

describe('actions', () => {
  it('should create an action to initial state', () => {
    const expectedAction = {
      type: types.SET_INITIAL_STATE,
      options: {}
    }
    expect(actions.setInitialState({})).toEqual(expectedAction);
  });

  it('should create an action to change grid dimensions', () => {
    const expectedAction = {
      type: types.CHANGE_DIMENSIONS,
      gridProperty: 'columns',
      behaviour: 'add'
    }
    expect(actions.changeDimensions('columns', 'add')).toEqual(expectedAction);
  });

  it('should create an action to set the color selected', () => {
    const expectedAction = {
      type: types.SET_COLOR_SELECTED,
      newColorSelected: '#FFFFFF',
      paletteColorPosition: 0
    }
    expect(actions.setColorSelected('#FFFFFF', 0)).toEqual(expectedAction);
  });

  it('should create an action to set the custom color', () => {
    const expectedAction = {
      type: types.SET_CUSTOM_COLOR,
      customColor: '#F0F0F0'
    }
    expect(actions.setCustomColor('#F0F0F0')).toEqual(expectedAction);
  });

  it('should create an action to draw a cell', () => {
    const expectedAction = {
      type: types.DRAW_CELL,
      id: 0
    }
    expect(actions.drawCell(0)).toEqual(expectedAction);
  });

  it('should create an action to set a drawing', () => {
    const expectedAction = {
      type: types.SET_DRAWING,
      frames: [],
      paletteGridData: [],
      cellSize: 10,
      columns: 2,
      rows: 2
    }
    expect(actions.setDrawing([], [], 10, 2, 2)).toEqual(expectedAction);
  });

  it('should create an action to end dragging', () => {
    const expectedAction = {
      type: types.END_DRAG
    }
    expect(actions.endDrag()).toEqual(expectedAction);
  });

  it('should create an action to set the eraser tool', () => {
    const expectedAction = {
      type: types.SET_ERASER
    }
    expect(actions.setEraser()).toEqual(expectedAction);
  });

  it('should create an action to set the bucket tool', () => {
    const expectedAction = {
      type: types.SET_BUCKET
    }
    expect(actions.setBucket()).toEqual(expectedAction);
  });

  it('should create an action to set the eye-dropper tool', () => {
    const expectedAction = {
      type: types.SET_EYEDROPPER
    }
    expect(actions.setEyedropper()).toEqual(expectedAction);
  });

  it('should create an action to set the color picker tool', () => {
    const expectedAction = {
      type: types.SET_COLOR_PICKER
    }
    expect(actions.setColorPicker()).toEqual(expectedAction);
  });

  it('should create an action to set the cell size', () => {
    const expectedAction = {
      type: types.SET_CELL_SIZE,
      cellSize: 5
    }
    expect(actions.setCellSize(5)).toEqual(expectedAction);
  });

  it('should create an action to set the reset the grid', () => {
    const expectedAction = {
      type: types.SET_RESET_GRID,
      columns: 5,
      rows: 5,
      activeFrameIndex: 0
    }
    expect(actions.resetGrid(5, 5, 0)).toEqual(expectedAction);
  });

  it('should create an action to show the spinner', () => {
    const expectedAction = {
      type: types.SHOW_SPINNER
    }
    expect(actions.showSpinner()).toEqual(expectedAction);
  });

  it('should create an action to hide the spinner', () => {
    const expectedAction = {
      type: types.HIDE_SPINNER
    }
    expect(actions.hideSpinner()).toEqual(expectedAction);
  });

  it('should create an action to send a notification', () => {
    const expectedAction = {
      type: types.SEND_NOTIFICATION,
      message: 'some message'
    }
    expect(actions.sendNotification('some message')).toEqual(expectedAction);
  });

  it('should create an action to change the active frame', () => {
    const expectedAction = {
      type: types.CHANGE_ACTIVE_FRAME,
      frameIndex: 1
    }
    expect(actions.changeActiveFrame(1)).toEqual(expectedAction);
  });

  it('should create an action to create a new frame', () => {
    const expectedAction = {
      type: types.CREATE_NEW_FRAME
    }
    expect(actions.createNewFrame()).toEqual(expectedAction);
  });

  it('should create an action to delete a frame', () => {
    const expectedAction = {
      type: types.DELETE_FRAME,
      frameId: 3
    }
    expect(actions.deleteFrame(3)).toEqual(expectedAction);
  });

  it('should create an action to duplicate a frame', () => {
    const expectedAction = {
      type: types.DUPLICATE_FRAME,
      frameId: 2
    }
    expect(actions.duplicateFrame(2)).toEqual(expectedAction);
  });

  it('should create an action to set the duration of a frame', () => {
    const expectedAction = {
      type: types.SET_DURATION,
      duration: 5
    }
    expect(actions.setDuration(5)).toEqual(expectedAction);
  });

  it('should create an action to change the interval of a frame', () => {
    const expectedAction = {
      type: types.CHANGE_FRAME_INTERVAL,
      frameIndex: 1,
      interval: 50
    }
    expect(actions.changeFrameInterval(1, 50)).toEqual(expectedAction);
  });

  it('should create an action to create a new project', () => {
    const expectedAction = {
      type: types.NEW_PROJECT
    }
    expect(actions.newProject()).toEqual(expectedAction);
  });
});
