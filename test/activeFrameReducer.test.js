import { List, Map } from 'immutable';
import reducer from '../src/store/reducers/activeFrameReducer';
import {
  APPLY_PENCIL,
  APPLY_ERASER,
  APPLY_BUCKET
} from '../src/store/actions/actionTypes';
import * as actions from '../src/store/actions/actionCreators';

const firstGridMock = [
  '#111111',
  '#111111',
  '#222222',
  '#222222',
  '#222222',
  '#333333'
];
const framesMock = () =>
  Map({
    list: List([
      Map({
        grid: List(firstGridMock)
      })
    ]),
    activeIndex: 0,
    columns: 2,
    rows: 3
  });

describe('framesReducer: APPLY_PENCIL', () => {
  const paletteColor = '#444444';
  const type = APPLY_PENCIL;

  it('draws cell with the palette color', () => {
    const state = framesMock();
    const nextState = reducer(state, {
      type,
      paletteColor,
      id: 1
    });

    expect(nextState.getIn(['list', 0, 'grid']).toJS()).toEqual([
      '#111111',
      paletteColor,
      '#222222',
      '#222222',
      '#222222',
      '#333333'
    ]);
  });
});

describe('framesReducer: APPLY_ERASER', () => {
  const type = APPLY_ERASER;

  it('draws cell with the palette color', () => {
    const state = framesMock();
    const nextState = reducer(state, {
      type,
      id: 3
    });

    expect(nextState.getIn(['list', 0, 'grid']).toJS()).toEqual([
      '#111111',
      '#111111',
      '#222222',
      '',
      '#222222',
      '#333333'
    ]);
  });
});

describe('framesReducer: APPLY_BUCKET', () => {
  const paletteColor = '#444444';
  const type = APPLY_BUCKET;
  const columns = 2;
  const rows = 3;

  it('drawing color area with two cells', () => {
    const state = framesMock();
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
      '#222222',
      '#222222',
      '#222222',
      '#333333'
    ]);
  });

  it('drawing color area with three cells', () => {
    const state = framesMock();
    const nextState = reducer(state, {
      type,
      paletteColor,
      columns,
      rows,
      id: 2
    });

    expect(nextState.getIn(['list', 0, 'grid']).toJS()).toEqual([
      '#111111',
      '#111111',
      paletteColor,
      paletteColor,
      paletteColor,
      '#333333'
    ]);
  });

  it('drawing color area with one cell', () => {
    const state = framesMock();
    const nextState = reducer(state, {
      type,
      paletteColor,
      columns,
      rows,
      id: 5
    });

    expect(nextState.getIn(['list', 0, 'grid']).toJS()).toEqual([
      '#111111',
      '#111111',
      '#222222',
      '#222222',
      '#222222',
      paletteColor
    ]);
  });
});

describe('framesReducer: SET_RESET_GRID', () => {
  it('resets the grid', () => {
    const state = framesMock();
    const nextState = reducer(state, actions.resetGrid());

    expect(nextState.getIn(['list', 0, 'grid']).toJS()).toEqual([
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
