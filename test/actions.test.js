import { PENCIL, ERASER } from '../src/store/reducers/drawingToolStates';
import * as actions from '../src/store/actions/actionCreators';
import * as types from '../src/store/actions/actionTypes';

describe('actions', () => {
  it('should create an action to initial state', () => {
    const expectedAction = {
      type: types.SET_INITIAL_STATE,
      options: {}
    };
    expect(actions.setInitialState({})).toEqual(expectedAction);
  });

  it('should create an action to change grid dimensions', () => {
    const expectedAction = {
      type: types.CHANGE_DIMENSIONS,
      gridProperty: 'columns',
      increment: 1
    };
    expect(actions.changeDimensions('columns', 1)).toEqual(expectedAction);
  });

  it('should create an action to select the palette color', () => {
    const type = types.SELECT_PALETTE_COLOR;
    const position = 0;
    expect(actions.selectPaletteColor(position)).toEqual({
      type,
      position
    });
  });

  it('should create an action to set the custom color', () => {
    const expectedAction = {
      type: types.SET_CUSTOM_COLOR,
      customColor: 'rgba(240, 240, 240, 1)'
    };
    expect(actions.setCustomColor('rgba(240, 240, 240, 1)')).toEqual(
      expectedAction
    );
  });

  it('should create APPLY_PENCIL when drawing tool is the pencil', () => {
    const drawingTool = PENCIL;
    const id = 0;
    const color = 'rgba(243, 243, 243, 1)';
    const paletteColor = 'rgba(162, 162, 162, 1)';
    expect(
      actions.cellAction({
        drawingTool,
        id,
        color,
        paletteColor
      })
    ).toEqual({
      type: `APPLY_${drawingTool}`,
      id,
      color,
      paletteColor
    });
  });

  it('should create APPLY_ERASER when drawing tool is the eraser', () => {
    const drawingTool = ERASER;
    const id = 0;
    const color = 'rgba(243, 243, 243, 1)';
    const paletteColor = 'rgba(162, 162, 162, 1)';
    expect(
      actions.cellAction({
        drawingTool,
        id,
        color,
        paletteColor
      })
    ).toEqual({
      type: `APPLY_${drawingTool}`,
      id,
      color,
      paletteColor
    });
  });

  it('should create an action to set a drawing', () => {
    const expectedAction = {
      type: types.SET_DRAWING,
      frames: [],
      paletteGridData: [],
      cellSize: 10,
      columns: 2,
      rows: 2
    };
    expect(actions.setDrawing([], [], 10, 2, 2)).toEqual(expectedAction);
  });

  it('should create an action to end dragging', () => {
    const expectedAction = {
      type: types.END_DRAG
    };
    expect(actions.endDrag()).toEqual(expectedAction);
  });

  it('should create an action to set the eraser tool', () => {
    const type = types.SWITCH_TOOL;
    const tool = 'ERASER';
    expect(actions.switchTool(tool)).toEqual({ type, tool });
  });

  it('should create an action to set the bucket tool', () => {
    const type = types.SWITCH_TOOL;
    const tool = 'BUCKET';
    expect(actions.switchTool(tool)).toEqual({ type, tool });
  });

  it('should create an action to set the eye-dropper tool', () => {
    const type = types.SWITCH_TOOL;
    const tool = 'EYEDROPPER';
    expect(actions.switchTool(tool)).toEqual({ type, tool });
  });

  it('should create an action to set the color picker tool', () => {
    const type = types.SWITCH_TOOL;
    const tool = 'COLOR_PICKER';
    expect(actions.switchTool(tool)).toEqual({ type, tool });
  });

  it('should create an action to set the move tool', () => {
    const type = types.SWITCH_TOOL;
    const tool = 'MOVE';
    expect(actions.switchTool(tool)).toEqual({ type, tool });
  });

  it('should create an action to set the cell size', () => {
    const expectedAction = {
      type: types.SET_CELL_SIZE,
      cellSize: 5
    };
    expect(actions.setCellSize(5)).toEqual(expectedAction);
  });

  it('should create an action to set the reset the grid', () => {
    const expectedAction = {
      type: types.SET_RESET_GRID
    };
    expect(actions.resetGrid()).toEqual(expectedAction);
  });

  it('should create an action to show the spinner', () => {
    const expectedAction = {
      type: types.SHOW_SPINNER
    };
    expect(actions.showSpinner()).toEqual(expectedAction);
  });

  it('should create an action to hide the spinner', () => {
    const expectedAction = {
      type: types.HIDE_SPINNER
    };
    expect(actions.hideSpinner()).toEqual(expectedAction);
  });

  it('should create an action to send a notification', () => {
    const expectedAction = {
      type: types.SEND_NOTIFICATION,
      message: 'some message'
    };
    expect(actions.sendNotification('some message')).toEqual(expectedAction);
  });

  it('should create an action to change the active frame', () => {
    const expectedAction = {
      type: types.CHANGE_ACTIVE_FRAME,
      frameIndex: 1
    };
    expect(actions.changeActiveFrame(1)).toEqual(expectedAction);
  });

  it('should create an action to reorder the dragged frame', () => {
    const expectedAction = {
      type: types.REORDER_FRAME,
      selectedIndex: 0,
      destinationIndex: 1
    };
    expect(actions.reorderFrame(0, 1)).toEqual(expectedAction);
  });

  it('should create an action to create a new frame', () => {
    const expectedAction = {
      type: types.CREATE_NEW_FRAME
    };
    expect(actions.createNewFrame()).toEqual(expectedAction);
  });

  it('should create an action to delete a frame', () => {
    const expectedAction = {
      type: types.DELETE_FRAME,
      frameId: 3
    };
    expect(actions.deleteFrame(3)).toEqual(expectedAction);
  });

  it('should create an action to duplicate a frame', () => {
    const expectedAction = {
      type: types.DUPLICATE_FRAME,
      frameId: 2
    };
    expect(actions.duplicateFrame(2)).toEqual(expectedAction);
  });

  it('should create an action to set the duration of a frame', () => {
    const expectedAction = {
      type: types.SET_DURATION,
      duration: 5
    };
    expect(actions.setDuration(5)).toEqual(expectedAction);
  });

  it('should create an action to change the interval of a frame', () => {
    const frameIndex = 0;
    const interval = 50;
    const expectedAction = {
      type: types.CHANGE_FRAME_INTERVAL,
      frameIndex,
      interval
    };
    expect(actions.changeFrameInterval(frameIndex, interval)).toEqual(
      expectedAction
    );
  });

  it('should create an action to create a new project', () => {
    const expectedAction = {
      type: types.NEW_PROJECT
    };
    expect(actions.newProject()).toEqual(expectedAction);
  });

  it('should create an action to change the hover cell position', () => {
    const expectedAction = {
      type: types.CHANGE_HOVERED_CELL,
      cell: { x: 2, y: 3 }
    };
    expect(actions.changeHoveredCell({ x: 2, y: 3 })).toEqual(expectedAction);
  });
});
