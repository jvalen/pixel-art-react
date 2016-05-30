import { Map, fromJS } from 'immutable';
import { expect } from 'chai';

import reducer, { createGrid } from '../src/reducer';

describe('reducer', () => {
  it('handles SET_INITIAL_STATE', () => {
    const initialState = Map();
    const action = {
      type: 'SET_INITIAL_STATE',
      state: Map({})
    };
    const nextState = reducer(initialState, action);

    expect(nextState).to.deep.equal(fromJS({
      cellSize: 10,
      columns: 10,
      currentColor: '#000000',
      initialColor: '313131',
      padding: 0.1,
      rows: 10,
      grid: createGrid(10 * 10, '313131'),
      paletteGridData: createGrid(4095, '313131', true)
    }));
  });

  it('handles SET_GRID_DIMENSION', () => {
    const dummyAction = {
      type: 'SET_INITIAL_STATE',
      state: Map({})
    };
    const dummyState = reducer(Map(), dummyAction);

    const action = {
      type: 'SET_GRID_DIMENSION',
      columns: 5,
      rows: 5,
      cellSize: 10
    };
    const nextState = reducer(dummyState, action);

    expect(nextState).to.deep.equal(fromJS({
      cellSize: 10,
      columns: 5,
      currentColor: '#000000',
      initialColor: '313131',
      padding: 0.1,
      rows: 5,
      grid: createGrid(5 * 5, '313131'),
      paletteGridData: createGrid(4095, '313131', true)
    }));
  });
});
