import { List, Map } from 'immutable';
import reducer from '../src/store/reducers/paletteReducer';
import {
  APPLY_PENCIL,
  APPLY_BUCKET,
  APPLY_EYEDROPPER
} from '../src/store/actions/actionTypes';
import * as actions from '../src/store/actions/actionCreators';

const CELL_COLOR = '#FFFFFF';
const GRID_DOES_NOT_INCLUDE_CELL_COLOR = List([
  Map({ color: '#DDDDDD' }),
  Map({ color: '#AAAAAA' }),
  Map({ color: '#555555' })
]);
const GRID_INCLUDES_CELL_COLOR = List([
  Map({ color: '#DDDDDD' }),
  Map({ color: CELL_COLOR }),
  Map({ color: '#555555' })
]);
const grid = GRID_DOES_NOT_INCLUDE_CELL_COLOR;

describe('reducer: SET_INITIAL_STATE', () => {
  it('palette grid should be initialized', () => {
    const nextState = reducer(undefined, actions.setInitialState({}));
    const nextGrid = nextState.get('grid');

    expect(nextGrid.getIn([0, 'color'])).toEqual('#000000');
    expect(nextGrid.getIn([23, 'color'])).toEqual('#ffffff');
    expect(nextGrid.getIn([24, 'color'])).toEqual('#383535');
    expect(nextGrid.getIn([29, 'color'])).toEqual('#383530');
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

    expect(nextGrid.getIn([10, 'color'])).toEqual('#4caf50');
    expect(nextGrid.getIn([20, 'color'])).toEqual('#9e9e9e');
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
  const customColor = '#654321';
  let state;
  let nextState;
  describe('palette color is not selected', () => {
    beforeEach(() => {
      state = Map({
        grid,
        position: -1
      });

      nextState = reducer(state, actions.setCustomColor(customColor));
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

      nextState = reducer(state, actions.setCustomColor(customColor));

      expect(nextState.getIn(['grid', position, 'color'])).toEqual(customColor);
    });
  });
});
