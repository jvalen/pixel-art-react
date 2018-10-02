import { List, Map } from 'immutable';
import reducer from '../src/store/reducers/paletteReducer';
import { PENCIL, BUCKET, EYEDROPPER } from '../src/store/reducers/drawingToolStates';
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

    expect(nextState.get('currentColor').toJS()).toEqual({
      color: '#000000',
      position: 0
    });
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

    expect(nextState.get('currentColor').toJS()).toEqual({
      color: '#000000',
      position: 0
    });
  });
});

describe('reducer: DRAW_CELL', () => {
  let state;
  let drawingTool;
  let nextState;
  describe('eyedrop tool active', () => {
    describe('cell color is not included in palette', () => {
      beforeEach(() => {
        drawingTool = EYEDROPPER;
        state = Map({ grid: GRID_DOES_NOT_INCLUDE_CELL_COLOR });

        nextState = reducer(state, actions.drawCell({
          color: CELL_COLOR,
          drawingTool
        }));
      });

      it('should update the last cell of grid', () => {
        expect(nextState.getIn(['grid', grid.size - 1, 'color'])).toEqual(CELL_COLOR);
      });

      it('should set cell color as selected color', () => {
        expect(nextState.getIn(['currentColor', 'color'])).toEqual(CELL_COLOR);
      });
    });

    describe('cell color is included in palette', () => {
      beforeEach(() => {
        drawingTool = EYEDROPPER;
        state = Map({ grid: GRID_INCLUDES_CELL_COLOR });

        nextState = reducer(state, actions.drawCell({
          color: CELL_COLOR,
          drawingTool
        }));
      });

      it('should not update the grid', () => {
        expect(nextState.get('grid').toJS()).toEqual(state.get('grid').toJS());
      });

      it('should set cell color as selected color', () => {
        expect(nextState.get('currentColor').toJS()).toEqual({
          color: CELL_COLOR,
          position: 1
        });
      });
    });
  });

  describe('pencil tool active', () => {
    describe('palette color is not selected', () => {
      beforeEach(() => {
        drawingTool = PENCIL;
        state = Map({
          grid,
          currentColor: Map()
        });

        nextState = reducer(state, actions.drawCell({
          drawingTool
        }));
      });

      it('should not update the grid', () => {
        expect(nextState.get('grid').toJS()).toEqual(state.get('grid').toJS());
      });

      it('should set first cell as selected color', () => {
        const firstGridCell = nextState.getIn(['grid', 0]);
        expect(nextState.getIn(['currentColor', 'color'])).toEqual(firstGridCell.get('color'));
      });
    });

    describe('palette color is selected', () => {
      it('should keep the same values', () => {
        drawingTool = PENCIL;
        state = Map({
          grid,
          currentColor: Map({ color: '#445566' })
        });

        nextState = reducer(state, actions.drawCell({
          drawingTool
        }));

        expect(nextState.toJS()).toEqual(state.toJS());
      });
    });
  });

  describe('bucket tool active', () => {
    describe('palette color is not selected', () => {
      beforeEach(() => {
        drawingTool = BUCKET;
        state = Map({
          grid,
          currentColor: Map()
        });

        nextState = reducer(state, actions.drawCell({
          drawingTool
        }));
      });

      it('should not update the grid', () => {
        expect(nextState.get('grid').toJS()).toEqual(state.get('grid').toJS());
      });

      it('should set first cell as selected color', () => {
        const firstGridCell = nextState.getIn(['grid', 0]);
        expect(nextState.getIn(['currentColor', 'color'])).toEqual(firstGridCell.get('color'));
      });
    });

    describe('palette color is selected', () => {
      it('should keep the same values', () => {
        drawingTool = BUCKET;
        state = Map({
          grid,
          currentColor: Map({ color: '#445566' })
        });

        nextState = reducer(state, actions.drawCell({
          drawingTool
        }));

        expect(nextState.toJS()).toEqual(state.toJS());
      });
    });
  });
});

describe('reducer: SELECT_PALETTE_COLOR', () => {
  it('should set the new color as the current color selected', () => {
    const selectedColor = '#FFFFFF';
    const position = 2;
    const nextState = reducer(Map(), actions.selectPaletteColor(selectedColor, position));

    expect(nextState.get('currentColor').toJS()).toEqual({
      color: selectedColor,
      position
    });
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
        currentColor: Map()
      });

      nextState = reducer(state, actions.setCustomColor(customColor));
    });

    it('should update the last cell of grid', () => {
      expect(nextState.getIn(['grid', grid.size - 1, 'color'])).toEqual(customColor);
    });

    it('should set custom color as selected color', () => {
      expect(nextState.getIn(['currentColor', 'color'])).toEqual(customColor);
    });
  });

  describe('palette color is selected', () => {
    it('should set the custom color in selected palette cell', () => {
      state = Map({
        grid,
        currentColor: Map({ color: '#AAAAAA', position: 1 })
      });

      nextState = reducer(state, actions.setCustomColor(customColor));

      expect(nextState.getIn(['currentColor', 'color'])).toEqual(customColor);
    });
  });
});
