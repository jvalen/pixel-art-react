import { Map } from 'immutable';
import reducer from '../src/store/reducers/reducer';
import * as actions from '../src/store/actions/actionCreators';

const applyActions = (actionList, state = Map()) => actionList.reduce(reducer, state);

describe('reducer: CHANGE_DIMENSIONS', () => {
  it('should add a column', () => {
    const nextState = applyActions([
      actions.setInitialState({}),
      actions.changeDimensions('columns', 1)
    ]);

    expect(nextState.getIn(['frames', 'columns'])).toEqual(21);
  });

  it('should remove a row', () => {
    const nextState = applyActions([
      actions.setInitialState({}),
      actions.changeDimensions('rows', -1)
    ]);

    expect(nextState.getIn(['frames', 'rows'])).toEqual(19);
  });
});

describe('reducer: SELECT_PALETTE_COLOR', () => {
  it('should set the new color as the current color selected', () => {
    const dummyState = reducer(Map(), actions.setInitialState({}));
    const nextState = reducer(dummyState, actions.selectPaletteColor('#FFFFFF', 2));

    expect(nextState.getIn(['palette', 'currentColor', 'color'])).toEqual('#FFFFFF');
  });
});

describe('reducer: SET_CUSTOM_COLOR', () => {
  it('should set the current palette color to the custom one', () => {
    const dummyState = reducer(Map(), actions.setInitialState({}));
    const nextState = reducer(dummyState, actions.setCustomColor('#123456'));

    expect(nextState.getIn(['palette', 'currentColor', 'color'])).toEqual('#123456');
  });
});

describe('reducer: DRAW_CELL', () => {
  it('should draw the first cell of the grid with the selected color', () => {
    const id = 0;
    const nextState = applyActions([
      actions.setInitialState({}),
      actions.drawCell({ id })
    ]);

    expect(nextState.getIn(['frames', 'list', 0, 'grid', id]))
      .toEqual(nextState.getIn(['palette', 'currentColor', 'color']));
  });

  it('should fill the empty grid with the selected color if bucket tool is active', () => {
    const id = 0;
    const dummyState = reducer(Map(), actions.setInitialState({ columns: 2, rows: 2 }));
    const currentColor = dummyState.getIn(['palette', 'currentColor', 'color']);
    const nextState = applyActions([
      actions.switchTool('BUCKET'),
      actions.drawCell({ id })
    ], dummyState);

    expect(nextState.getIn(['frames', 'list', 0, 'grid']).toJS())
      .toEqual([currentColor, currentColor, currentColor, currentColor]);
  });

  it('should set the new color in the last palette spot if eyedropper tool is active', () => {
    const id = 1;
    const color = '#A1A1A1';
    const nextState = applyActions([
      actions.setInitialState({}),
      actions.switchTool('EYEDROPPER'),
      actions.drawCell({ id, color })
    ]);
    const paletteColorCount = nextState.getIn(['palette', 'grid']).size;

    expect(nextState.getIn(['palette', 'currentColor', 'position'])).toEqual(paletteColorCount - 1);
  });
});

describe('reducer: UPDATE_GRID_BOUNDARIES', () => {
  it('should update the grid boundaries', () => {
    const newBoundaries = {
      x: 100,
      y: 200,
      width: 400,
      height: 350
    };
    const gridElement = {
      getBoundingClientRect: () => newBoundaries
    };
    const dummyState = reducer(Map(), actions.setInitialState({}));
    const nextState = reducer(dummyState, actions.updateGridBoundaries(gridElement));

    expect(nextState.get('gridBoundaries'))
      .toEqual(newBoundaries);
  });

  it('grid boundaries is not updated with properties distinct to x, y, width or height', () => {
    const newBoundaries = {
      x: 100,
      y: 200,
      width: 400,
      height: 350,
      extraProp: 'hello'
    };
    const gridElement = {
      getBoundingClientRect: () => newBoundaries
    };
    const dummyState = reducer(Map(), actions.setInitialState({}));
    const nextState = reducer(dummyState, actions.updateGridBoundaries(gridElement));

    expect(nextState.get('gridBoundaries').extraProp)
      .toEqual(undefined);
  });
});
