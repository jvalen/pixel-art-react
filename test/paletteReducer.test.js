import { List, Map } from 'immutable';
import reducer from '../src/store/reducers/paletteReducer';
import {
  APPLY_PENCIL,
  APPLY_BUCKET,
  APPLY_EYEDROPPER
} from '../src/store/actions/actionTypes';
import * as actions from '../src/store/actions/actionCreators';

const CELL_COLOR = 'rgba(255, 255, 255, 1)';
const GRID_DOES_NOT_INCLUDE_CELL_COLOR = List([
  Map({ color: 'rgba(221, 221, 221, 1)' }),
  Map({ color: 'rgba(170, 170, 170, 1)' }),
  Map({ color: 'rgba(85, 85, 85, 1)' })
]);
const GRID_INCLUDES_CELL_COLOR = List([
  Map({ color: 'rgba(221, 221, 221, 1)' }),
  Map({ color: CELL_COLOR }),
  Map({ color: 'rgba(85, 85, 85, 1)' })
]);
const grid = GRID_DOES_NOT_INCLUDE_CELL_COLOR;

describe('reducer: SET_INITIAL_STATE', () => {
  it('palette grid should be initialized', () => {
    const nextState = reducer(undefined, actions.setInitialState({}));
    const nextGrid = nextState.get('grid');

    expect(nextGrid.getIn([0, 'color'])).toEqual('rgba(0, 0, 0, 1)');
    expect(nextGrid.getIn([23, 'color'])).toEqual('rgba(255, 255, 255, 1)');
    expect(nextGrid.getIn([24, 'color'])).toEqual('rgba(56, 53, 53, 1)');
    expect(nextGrid.getIn([29, 'color'])).toEqual('rgba(56, 53, 53, 1)');
  });

  it('palette grid should be initialized', () => {
    const nextState = reducer(undefined, actions.setInitialState({}));

    expect(nextState.get('position')).toEqual(0);
  });
});

describe('reducer: NEW_PROJECT', () => {
  it('palette grid should be initialized', () => {
    const nextState = reducer(undefined, actions.newProject());
    const nextGrid = nextState.get('grid');

    expect(nextGrid.getIn([10, 'color'])).toEqual('rgba(76, 175, 80, 1)');
    expect(nextGrid.getIn([20, 'color'])).toEqual('rgba(158, 158, 158, 1)');
  });

  it('palette grid should be initialized', () => {
    const nextState = reducer(undefined, actions.newProject());

    expect(nextState.get('position')).toEqual(0);
  });
});

describe('paletteReducer: APPLY_EYEDROPPER', () => {
  const type = APPLY_EYEDROPPER;
  let state;
  let nextState;
  describe('cell color is not included in palette', () => {
    beforeEach(() => {
      state = Map({ grid: GRID_DOES_NOT_INCLUDE_CELL_COLOR });

      nextState = reducer(state, { type, color: CELL_COLOR });
    });

    it('should update the last cell of grid', () => {
      expect(nextState.getIn(['grid', grid.size - 1, 'color'])).toEqual(
        CELL_COLOR
      );
    });

    it('should set cell color as selected color', () => {
      expect(nextState.get('position')).toEqual(grid.size - 1);
    });
  });

  describe('cell color is included in palette', () => {
    beforeEach(() => {
      state = Map({ grid: GRID_INCLUDES_CELL_COLOR });

      nextState = reducer(state, { type, color: CELL_COLOR });
    });

    it('should not update the grid', () => {
      expect(nextState.get('grid').toJS()).toEqual(state.get('grid').toJS());
    });

    it('should set cell color as selected color', () => {
      expect(nextState.get('position')).toEqual(1);
    });
  });
});

describe('paletteReducer: APPLY_PENCIL', () => {
  const type = APPLY_PENCIL;
  let state;
  let nextState;
  describe('palette color is not selected', () => {
    beforeEach(() => {
      state = Map({
        grid,
        position: -1
      });

      nextState = reducer(state, { type });
    });

    it('should not update the grid', () => {
      expect(nextState.get('grid').toJS()).toEqual(state.get('grid').toJS());
    });

    it('should set first cell as selected color', () => {
      expect(nextState.get('position')).toEqual(0);
    });
  });

  describe('palette color is selected', () => {
    it('should keep the same values', () => {
      state = Map({
        grid,
        position: 2
      });

      nextState = reducer(state, { type });

      expect(nextState.toJS()).toEqual(state.toJS());
    });
  });
});

describe('paletteReducer: APPLY_BUCKET', () => {
  const type = APPLY_BUCKET;
  let state;
  let nextState;
  describe('palette color is not selected', () => {
    beforeEach(() => {
      state = Map({
        grid,
        position: -1
      });

      nextState = reducer(state, { type });
    });

    it('should not update the grid', () => {
      expect(nextState.get('grid').toJS()).toEqual(state.get('grid').toJS());
    });

    it('should set first cell as selected color', () => {
      expect(nextState.get('position')).toEqual(0);
    });
  });

  describe('palette color is selected', () => {
    it('should keep the same values', () => {
      state = Map({
        grid,
        position: 1
      });

      nextState = reducer(state, { type });

      expect(nextState.toJS()).toEqual(state.toJS());
    });
  });
});

describe('reducer: SELECT_PALETTE_COLOR', () => {
  const position = 2;
  let state;
  let nextState;
  beforeEach(() => {
    state = Map({ grid });
    nextState = reducer(state, actions.selectPaletteColor(position));
  });

  it('should keep the grid with the same values', () => {
    expect(nextState.get('grid').toJS()).toEqual(state.get('grid').toJS());
  });

  it('should update the position of active cell', () => {
    expect(nextState.get('position')).toEqual(position);
  });
});

describe('reducer: SET_CUSTOM_COLOR', () => {
  const rgbColorValues = {
    r: 101,
    g: 67,
    b: 33,
    a: 1
  };
  const customColor = `rgba(${rgbColorValues.r},${rgbColorValues.g},${rgbColorValues.b},${rgbColorValues.a})`;
  let state;
  let nextState;
  describe('palette color is not selected', () => {
    beforeEach(() => {
      state = Map({
        grid,
        position: -1
      });

      nextState = reducer(state, actions.setCustomColor(rgbColorValues));
    });

    it('should update the last cell of grid', () => {
      expect(nextState.getIn(['grid', grid.size - 1, 'color'])).toEqual(
        customColor
      );
    });

    it('should set custom color as selected color', () => {
      expect(nextState.get('position')).toEqual(grid.size - 1);
    });
  });

  describe('palette color is selected', () => {
    it('should set the custom color in selected palette cell', () => {
      const position = 1;
      state = Map({
        grid,
        position
      });

      nextState = reducer(state, actions.setCustomColor(rgbColorValues));

      expect(nextState.getIn(['grid', position, 'color'])).toEqual(customColor);
    });
  });
});
