import { List, Map, fromJS } from 'immutable';
import { expect } from 'chai';

import reducer from '../src/store/reducers/reducer';
import {
  createGrid, createPalette, resetIntervals, setGridCellValue,
  checkColorInPalette, addColorToLastCellInPalette, getPositionFirstMatchInPalette
} from '../src/store/reducers/reducerHelpers';


describe('reducer: SET_INITIAL_STATE', () => {
  it('set the initial state', () => {
    const initialState = Map();
    const action = {
      type: 'SET_INITIAL_STATE',
      state: Map({})
    };
    const nextState = reducer(initialState, action);

    expect(nextState).to.deep.equal(fromJS({
      frames: [createGrid(20 * 20, '#313131', 100)],
      paletteGridData: createPalette(),
      cellSize: 10,
      columns: 20,
      rows: 20,
      currentColor: { color: '#000000', position: 0 },
      initialColor: '#313131',
      eraserOn: false,
      eyedropperOn: false,
      colorPickerOn: false,
      bucketOn: false,
      loading: false,
      notifications: List(),
      activeFrameIndex: 0,
      duration: 1
    }));
  });
});

describe('reducer: CHANGE_DIMENSIONS', () => {
  it('add a column', () => {
    const dummyAction = {
      type: 'SET_INITIAL_STATE',
      state: Map({})
    };
    const dummyState = reducer(Map(), dummyAction);

    const action = {
      type: 'CHANGE_DIMENSIONS',
      gridProperty: 'columns',
      behaviour: 'add',
    };
    const nextState = reducer(dummyState, action);

    expect(nextState.get('columns')).to.equal(21);
  });
  it('remove a row', () => {
    const dummyAction = {
      type: 'SET_INITIAL_STATE',
      state: Map({})
    };
    const dummyState = reducer(Map(), dummyAction);

    const action = {
      type: 'CHANGE_DIMENSIONS',
      gridProperty: 'rows',
      behaviour: 'remove',
    };
    const nextState = reducer(dummyState, action);

    expect(nextState.get('rows')).to.equal(19);
  });
});

describe('reducer: SET_COLOR_SELECTED', () => {
  it('color provided is already in palette', () => {
    const dummyAction = {
      type: 'SET_INITIAL_STATE',
      state: Map({})
    };
    const dummyState = reducer(Map(), dummyAction);

    const action = {
      type: 'SET_COLOR_SELECTED',
      newColorSelected: '#ffffff',
      paletteColorPosition: 2,
    };
    const nextState = reducer(dummyState, action);
    expect(nextState.get('currentColor').get('color')).to.equal(
      '#ffffff'
    );
  });

  it('color provided is inside the palette but the position is unknown', () => {
    const dummyAction = {
      type: 'SET_INITIAL_STATE',
      state: Map({})
    };
    const dummyState = reducer(Map(), dummyAction);

    const action = {
      type: 'SET_COLOR_SELECTED',
      newColorSelected: '#ff0000', // Is in position 1
      paletteColorPosition: null, // Unknown position
    };
    const nextState = reducer(dummyState, action);
    expect(nextState.get('currentColor').get('position')).to.equal(1);
  });

  it('color provided is not set in palette', () => {
    const dummyAction = {
      type: 'SET_INITIAL_STATE',
      state: Map({})
    };
    const dummyState = reducer(Map(), dummyAction);

    const action = {
      type: 'SET_COLOR_SELECTED',
      newColorSelected: '#FFFFF00', // Is not inside the palette
      paletteColorPosition: null, // Unknown position
    };
    const nextState = reducer(dummyState, action);
    expect(nextState.get('currentColor').get('position')).to.equal(
      nextState.get('paletteGridData').size - 1
    );
  });
});

describe('reducer: SET_CUSTOM_COLOR', () => {
  it('there is a color selected and it will be modified', () => {
    const dummyAction = {
      type: 'SET_INITIAL_STATE',
      state: Map({})
    };
    const dummyState = reducer(Map(), dummyAction);

    const action = {
      type: 'SET_CUSTOM_COLOR',
      customColor: '#123456'
    };
    const nextState = reducer(dummyState, action);
    expect(nextState.get('currentColor').get('color')).to.equal(
      '#123456'
    );
    expect(nextState.get('currentColor').get('position')).to.equal(
      0
    );
  });
  it('there is no color selected, it should create one at the end of the palette', () => {
    const dummyAction = {
      type: 'SET_INITIAL_STATE',
      state: Map({})
    };
    let dummyState = reducer(Map(), dummyAction);
    dummyState = dummyState.merge({
      currentColor: { color: null, position: -1 }
    });

    const action = {
      type: 'SET_CUSTOM_COLOR',
      customColor: '#ff0000'
    };

    const nextState = reducer(dummyState, action);
    expect(nextState.get('currentColor').get('color')).to.equal(
      '#ff0000'
    );
    expect(nextState.get('currentColor').get('position')).to.equal(
      nextState.get('paletteGridData').size - 1
    );
  });
});
describe('reducer: DRAW_CELL', () => {
  it('Draw the first cell of the grid with the color selected', () => {
    const dummyAction = {
      type: 'SET_INITIAL_STATE',
      state: Map({})
    };
    const dummyState = reducer(Map(), dummyAction);

    const action = {
      type: 'DRAW_CELL',
      id: 0
    };
    const nextState = reducer(dummyState, action);
    expect(nextState.getIn(['frames', 0, 'grid', 0, 'color'])).to.equal(
      nextState.get('currentColor').get('color')
    );
  });
});
