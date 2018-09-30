import { Map } from 'immutable';
import reducer from '../src/store/reducers/reducer';
import * as actions from '../src/store/actions/actionCreators';

describe('reducer: CHANGE_DIMENSIONS', () => {
  it('should add a column', () => {
    const dummyState = reducer(Map(), actions.setInitialState({}));
    const nextState = reducer(dummyState, actions.changeDimensions('columns', 1));

    expect(nextState.getIn(['frames', 'columns'])).toEqual(21);
  });

  it('should remove a row', () => {
    const dummyState = reducer(Map(), actions.setInitialState({}));
    const nextState = reducer(dummyState, actions.changeDimensions('rows', -1));

    expect(nextState.getIn(['frames', 'rows'])).toEqual(19);
  });
});

describe('reducer: SET_COLOR_SELECTED', () => {
  it('should set the new color as the current color selected', () => {
    const dummyState = reducer(Map(), actions.setInitialState({}));
    const nextState = reducer(dummyState, actions.setColorSelected('#FFFFFF', 2));

    expect(nextState.getIn(['palette', 'currentColor', 'color'])).toEqual('#FFFFFF');
  });

  it('should set the new color in the last palette spot if it does not exist already', () => {
    const dummyState = reducer(Map(), actions.setInitialState({}));
    const nextState = reducer(dummyState, actions.setColorSelected('#FF0000', null));
    const paletteColorCount = nextState.getIn(['palette', 'grid']).size;

    expect(nextState.getIn(['palette', 'currentColor', 'position'])).toEqual(paletteColorCount - 1);
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
    const dummyState = reducer(Map(), actions.setInitialState({}));
    const nextState = reducer(dummyState, actions.drawCell(0));

    expect(nextState.getIn(['frames', 'list', 0, 'grid', 0]))
      .toEqual(nextState.getIn(['palette', 'currentColor', 'color']));
  });

  it('should fill the empty grid with the selected color if bucket tool is active', () => {
    const dummyState = reducer(Map(), actions.setInitialState({ columns: 2, rows: 2 }));
    const currentColor = dummyState.getIn(['palette', 'currentColor', 'color']);
    const nextState = reducer(reducer(dummyState, actions.setBucket()), actions.drawCell(0));

    expect(nextState.getIn(['frames', 'list', 0, 'grid']).toJS())
      .toEqual([currentColor, currentColor, currentColor, currentColor]);
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
