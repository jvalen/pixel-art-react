import {
  PENCIL,
  BUCKET,
  MOVE,
  ERASER,
  EYEDROPPER,
  COLOR_PICKER
} from '../src/store/reducers/drawingToolStates';
import reducer from '../src/store/reducers/drawingToolReducer';
import { APPLY_EYEDROPPER } from '../src/store/actions/actionTypes';
import * as actions from '../src/store/actions/actionCreators';

const otherAction = () => ({});

describe('drawing tool reducer: SET_INITIAL_STATE', () => {
  it('should set PENCIL state', () => {
    const state = EYEDROPPER;
    const nextState = reducer(state, actions.setInitialState({}));

    expect(nextState).toEqual(PENCIL);
  });
});

describe('drawing tool reducer: NEW_PROJECT', () => {
  it('should set PENCIL state', () => {
    const state = ERASER;
    const nextState = reducer(state, actions.newProject());

    expect(nextState).toEqual(PENCIL);
  });
});

describe('drawing tool reducer: APPLY_EYEDROPPER', () => {
  it('should set PENCIL state when eyedropper action is performed', () => {
    const nextState = reducer('', { type: APPLY_EYEDROPPER });

    expect(nextState).toEqual(PENCIL);
  });
});

describe('drawing tool reducer: SELECT_PALETTE_COLOR', () => {
  it('should set PENCIL state when state is EYEDROPPER', () => {
    const state = EYEDROPPER;
    const nextState = reducer(state, actions.selectPaletteColor());

    expect(nextState).toEqual(PENCIL);
  });

  it('should set PENCIL state when state is ERASER', () => {
    const state = ERASER;
    const nextState = reducer(state, actions.selectPaletteColor());

    expect(nextState).toEqual(PENCIL);
  });

  it('should keep the same state when state is BUCKET', () => {
    const state = BUCKET;
    const nextState = reducer(state, actions.selectPaletteColor());

    expect(nextState).toEqual(state);
  });

  it('should keep the same state when state is MOVE', () => {
    const state = MOVE;
    const nextState = reducer(state, actions.selectPaletteColor());

    expect(nextState).toEqual(PENCIL);
  });

  it('should keep the same state when state is PENCIL', () => {
    const state = PENCIL;
    const nextState = reducer(state, actions.selectPaletteColor());

    expect(nextState).toEqual(state);
  });
});

describe('drawing tool reducer: SWITCH_TOOL', () => {
  it('should set the action tool when state is PENCIL', () => {
    const tool = ERASER;
    const state = PENCIL;
    const nextState = reducer(state, actions.switchTool(tool));

    expect(nextState).toEqual(tool);
  });

  it('should set the action PENCIL when state is the same as action tool', () => {
    const tool = EYEDROPPER;
    const state = EYEDROPPER;
    const nextState = reducer(state, actions.switchTool(tool));

    expect(nextState).toEqual(PENCIL);
  });

  it('should set the action tool when state is different to action tool', () => {
    const tool = COLOR_PICKER;
    const state = BUCKET;
    const nextState = reducer(state, actions.switchTool(tool));

    expect(nextState).toEqual(tool);
  });
});

describe('drawing tool reducer: <<other action>>', () => {
  it('should keep the same state', () => {
    const state = BUCKET;
    const nextState = reducer(state, otherAction());

    expect(nextState).toEqual(state);
  });
});
