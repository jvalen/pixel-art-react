import { Map } from 'immutable';
import reducer from '../src/store/reducers/reducer';
import * as actions from '../src/store/actions/actionCreators';

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
    const nextState = reducer(
      dummyState,
      actions.updateGridBoundaries(gridElement)
    );

    expect(nextState.get('gridBoundaries')).toEqual(newBoundaries);
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
    const nextState = reducer(
      dummyState,
      actions.updateGridBoundaries(gridElement)
    );

    expect(nextState.get('gridBoundaries').extraProp).toEqual(undefined);
  });
});
