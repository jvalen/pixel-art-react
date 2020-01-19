import { List, Map } from 'immutable';
import reducer from '../src/store/reducers/activeFrameReducer';
import {
  APPLY_PENCIL,
  APPLY_ERASER,
  APPLY_BUCKET,
  MOVE_DRAWING
} from '../src/store/actions/actionTypes';
import * as actions from '../src/store/actions/actionCreators';

const gridMock = [
  'rgba(17, 17, 17, 1)',
  'rgba(17, 17, 17, 1)',
  'rgba(34, 34, 34, 1)',
  'rgba(34, 34, 34, 1)',
  'rgba(34, 34, 34, 1)',
  'rgba(51, 51, 51, 1)',
  'rgba(12, 12, 12, 1)',
  'rgba(12, 12, 12, 1)',
  'rgba(12, 12, 12, 1)'
];
const framesMock = grid =>
  Map({
    list: List([
      Map({
        grid: List(grid)
      })
    ]),
    activeIndex: 0,
    columns: 3,
    rows: 3
  });

describe('framesReducer: APPLY_PENCIL', () => {
  const paletteColor = 'rgba(68, 68, 68, 1)';
  const type = APPLY_PENCIL;

  it('draws cell with the palette color', () => {
    const state = framesMock(gridMock);
    const nextState = reducer(state, {
      type,
      paletteColor,
      id: 1
    });

    expect(nextState.getIn(['list', 0, 'grid']).toJS()).toEqual([
      'rgba(17, 17, 17, 1)',
      paletteColor,
      'rgba(34, 34, 34, 1)',
      'rgba(34, 34, 34, 1)',
      'rgba(34, 34, 34, 1)',
      'rgba(51, 51, 51, 1)',
      'rgba(12, 12, 12, 1)',
      'rgba(12, 12, 12, 1)',
      'rgba(12, 12, 12, 1)'
    ]);
  });
});

describe('framesReducer: APPLY_ERASER', () => {
  const type = APPLY_ERASER;

  it('draws cell with the palette color', () => {
    const state = framesMock(gridMock);
    const nextState = reducer(state, {
      type,
      id: 3
    });

    expect(nextState.getIn(['list', 0, 'grid']).toJS()).toEqual([
      'rgba(17, 17, 17, 1)',
      'rgba(17, 17, 17, 1)',
      'rgba(34, 34, 34, 1)',
      '',
      'rgba(34, 34, 34, 1)',
      'rgba(51, 51, 51, 1)',
      'rgba(12, 12, 12, 1)',
      'rgba(12, 12, 12, 1)',
      'rgba(12, 12, 12, 1)'
    ]);
  });
});

describe('framesReducer: APPLY_BUCKET', () => {
  const paletteColor = 'rgba(68, 68, 68, 1)';
  const type = APPLY_BUCKET;
  const columns = 2;
  const rows = 3;

  it('drawing color area with two cells', () => {
    const state = framesMock(gridMock);
    const nextState = reducer(state, {
      type,
      paletteColor,
      columns,
      rows,
      id: 1
    });

    expect(nextState.getIn(['list', 0, 'grid']).toJS()).toEqual([
      paletteColor,
      paletteColor,
      'rgba(34, 34, 34, 1)',
      'rgba(34, 34, 34, 1)',
      'rgba(34, 34, 34, 1)',
      'rgba(51, 51, 51, 1)',
      'rgba(12, 12, 12, 1)',
      'rgba(12, 12, 12, 1)',
      'rgba(12, 12, 12, 1)'
    ]);
  });

  it('drawing color area with three cells', () => {
    const state = framesMock(gridMock);
    const nextState = reducer(state, {
      type,
      paletteColor,
      columns,
      rows,
      id: 2
    });

    expect(nextState.getIn(['list', 0, 'grid']).toJS()).toEqual([
      'rgba(17, 17, 17, 1)',
      'rgba(17, 17, 17, 1)',
      paletteColor,
      paletteColor,
      paletteColor,
      'rgba(51, 51, 51, 1)',
      'rgba(12, 12, 12, 1)',
      'rgba(12, 12, 12, 1)',
      'rgba(12, 12, 12, 1)'
    ]);
  });

  it('drawing color area with one cell', () => {
    const state = framesMock(gridMock);
    const nextState = reducer(state, {
      type,
      paletteColor,
      columns,
      rows,
      id: 5
    });

    expect(nextState.getIn(['list', 0, 'grid']).toJS()).toEqual([
      'rgba(17, 17, 17, 1)',
      'rgba(17, 17, 17, 1)',
      'rgba(34, 34, 34, 1)',
      'rgba(34, 34, 34, 1)',
      'rgba(34, 34, 34, 1)',
      paletteColor,
      'rgba(12, 12, 12, 1)',
      'rgba(12, 12, 12, 1)',
      'rgba(12, 12, 12, 1)'
    ]);
  });
});

describe('framesReducer: SET_RESET_GRID', () => {
  it('resets the grid', () => {
    const state = framesMock(gridMock);
    const nextState = reducer(state, actions.resetGrid());

    expect(nextState.getIn(['list', 0, 'grid']).toJS()).toEqual([
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      ''
    ]);
  });
});

describe('framesReducer: CHANGE_FRAME_INTERVAL', () => {
  it('changes the interval of frame', () => {
    const activeIndex = 1;
    const interval = 70;
    const state = Map({
      list: List([Map({ interval: 50 }), Map({ interval: 100 })]),
      activeIndex
    });
    const nextState = reducer(state, actions.changeFrameInterval(interval));

    expect(nextState.getIn(['list', activeIndex, 'interval'])).toEqual(
      interval
    );
  });
});

describe('framesReducer: MOVE_DRAWING', () => {
  let grid;
  let state;
  let type;
  beforeEach(() => {
    grid = [
      'rgba(1, 1, 1, 1)',
      'rgba(2, 2, 2, 1)',
      'rgba(3, 3, 3, 1)',
      'rgba(4, 4, 4, 1)',
      'rgba(5, 5, 5, 1)',
      'rgba(6, 6, 6, 1)',
      'rgba(7, 7, 7, 1)',
      'rgba(8, 8, 8, 1)',
      'rgba(9, 9, 9, 1)'
    ];
    state = framesMock(grid);
    type = MOVE_DRAWING;
  });
  it('moves left the current frame drawing', () => {
    const nextState = reducer(state, {
      type,
      moveDiff: { xDiff: -2, yDiff: 0, cellWidth: 1 }
    });
    const shiftedGrid = [
      'rgba(2, 2, 2, 1)',
      'rgba(3, 3, 3, 1)',
      'rgba(1, 1, 1, 1)',
      'rgba(5, 5, 5, 1)',
      'rgba(6, 6, 6, 1)',
      'rgba(4, 4, 4, 1)',
      'rgba(8, 8, 8, 1)',
      'rgba(9, 9, 9, 1)',
      'rgba(7, 7, 7, 1)'
    ];

    expect(nextState.getIn(['list', 0, 'grid']).toJS()).toEqual(shiftedGrid);
  });
  it('moves right the current frame drawing', () => {
    const nextState = reducer(state, {
      type,
      moveDiff: { xDiff: 2, yDiff: 0, cellWidth: 1 }
    });
    const shiftedGrid = [
      'rgba(3, 3, 3, 1)',
      'rgba(1, 1, 1, 1)',
      'rgba(2, 2, 2, 1)',
      'rgba(6, 6, 6, 1)',
      'rgba(4, 4, 4, 1)',
      'rgba(5, 5, 5, 1)',
      'rgba(9, 9, 9, 1)',
      'rgba(7, 7, 7, 1)',
      'rgba(8, 8, 8, 1)'
    ];

    expect(nextState.getIn(['list', 0, 'grid']).toJS()).toEqual(shiftedGrid);
  });
  it('moves up the current frame drawing', () => {
    const nextState = reducer(state, {
      type,
      moveDiff: { xDiff: 0, yDiff: -2, cellWidth: 1 }
    });
    const shiftedGrid = [
      'rgba(4, 4, 4, 1)',
      'rgba(5, 5, 5, 1)',
      'rgba(6, 6, 6, 1)',
      'rgba(7, 7, 7, 1)',
      'rgba(8, 8, 8, 1)',
      'rgba(9, 9, 9, 1)',
      'rgba(1, 1, 1, 1)',
      'rgba(2, 2, 2, 1)',
      'rgba(3, 3, 3, 1)'
    ];

    expect(nextState.getIn(['list', 0, 'grid']).toJS()).toEqual(shiftedGrid);
  });
  it('moves down the current frame drawing', () => {
    const nextState = reducer(state, {
      type,
      moveDiff: { xDiff: 0, yDiff: 2, cellWidth: 1 }
    });
    const shiftedGrid = [
      'rgba(7, 7, 7, 1)',
      'rgba(8, 8, 8, 1)',
      'rgba(9, 9, 9, 1)',
      'rgba(1, 1, 1, 1)',
      'rgba(2, 2, 2, 1)',
      'rgba(3, 3, 3, 1)',
      'rgba(4, 4, 4, 1)',
      'rgba(5, 5, 5, 1)',
      'rgba(6, 6, 6, 1)'
    ];

    expect(nextState.getIn(['list', 0, 'grid']).toJS()).toEqual(shiftedGrid);
  });
});
