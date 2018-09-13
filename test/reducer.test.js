import { Map } from 'immutable';
import reducer from '../src/store/reducers/reducer';
import * as actions from '../src/store/actions/actionCreators';

describe('reducer: CHANGE_DIMENSIONS', () => {
  it('should add a column', () => {
    const dummyState = reducer(Map(), actions.setInitialState({}));
    const nextState = reducer(dummyState, actions.changeDimensions('columns', 'add'));

    expect(nextState.get('columns')).toEqual(21);
  });

  it('should remove a row', () => {
    const dummyState = reducer(Map(), actions.setInitialState({}));
    const nextState = reducer(dummyState, actions.changeDimensions('rows', 'remove'));

    expect(nextState.get('rows')).toEqual(19);
  });
});

describe('reducer: SET_COLOR_SELECTED', () => {
  it('should set the new color as the current color selected', () => {
    const dummyState = reducer(Map(), actions.setInitialState({}));
    const nextState = reducer(dummyState, actions.setColorSelected('#FFFFFF', 2));

    expect(nextState.get('currentColor').get('color')).toEqual('#FFFFFF');
  });

  it('should set the new color in the last palette spot if it does not exist already', () => {
    const dummyState = reducer(Map(), actions.setInitialState({}));
    const nextState = reducer(dummyState, actions.setColorSelected('#FF0000', null));
    const paletteColorCount = nextState.get('paletteGridData').size;

    expect(nextState.get('currentColor').get('position')).toEqual(paletteColorCount - 1);
  });
});

describe('reducer: SET_CUSTOM_COLOR', () => {
  it('should set the current palette color to the custom one', () => {
    const dummyState = reducer(Map(), actions.setInitialState({}));
    const nextState = reducer(dummyState, actions.setCustomColor('#123456'));

    expect(nextState.get('currentColor').get('color')).toEqual('#123456');
  });
});

describe('reducer: DRAW_CELL', () => {
  it('should draw the first cell of the grid with the selected color', () => {
    const dummyState = reducer(Map(), actions.setInitialState({}));
    const nextState = reducer(dummyState, actions.drawCell(0));

    expect(nextState.getIn(['frames', 0, 'grid', 0]))
      .toEqual(nextState.get('currentColor').get('color'));
  });

  it('should fill the empty grid with the selected color if bucket tool is active', () => {
    const dummyState = reducer(Map(), actions.setInitialState({ columns: 2, rows: 2 }));
    const currentColor = dummyState.get('currentColor').get('color');
    const nextState = reducer(reducer(dummyState, actions.setBucket()), actions.drawCell(0));

    expect(nextState.getIn(['frames', 0, 'grid']).toJS())
      .toEqual([currentColor, currentColor, currentColor, currentColor]);
  });
});

describe('reducer: START_TO_DRAG', () => {
  it('should draw the first cell of the grid with the selected color', () => {
    const dummyState = reducer(Map(), actions.setInitialState({}));
    const nextState = reducer(dummyState, actions.startToDrag(0));

    expect(nextState.getIn(['frames', 0, 'grid', 0]))
      .toEqual(nextState.get('currentColor').get('color'));
  });

  it('should set dragging state to true', () => {
    const dummyState = reducer(Map(), actions.setInitialState({}));
    const nextState = reducer(dummyState, actions.startToDrag(0));

    expect(nextState.get('dragging'))
      .toEqual(true);
  });
});

describe('reducer: MOUSE_OVER', () => {
  describe('when state is dragging', () => {
    it('should draw the first cell of the grid with the selected color', () => {
      const dummyState = reducer(Map(), actions.setInitialState({})).set('dragging', true);
      const nextState = reducer(dummyState, actions.mouseOver(0));

      expect(nextState.getIn(['frames', 0, 'grid', 0]))
        .toEqual(nextState.get('currentColor').get('color'));
    });
  });

  describe('when state is not dragging', () => {
    it('should not draw the first cell', () => {
      const dummyState = reducer(Map(), actions.setInitialState({}));
      const nextState = reducer(dummyState, actions.mouseOver(0));

      expect(nextState.getIn(['frames', 0, 'grid', 0]))
        .toEqual('');
    });
  });

  describe('reducer: DROP', () => {
    it('should set dragging state to false', () => {
      const dummyState = reducer(Map(), actions.setInitialState({})).set('dragging', true);
      const nextState = reducer(dummyState, actions.drop());

      expect(nextState.get('dragging'))
        .toEqual(false);
    });
  });
});
