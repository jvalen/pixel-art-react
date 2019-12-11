import { List, Map } from 'immutable';
import reducer from '../src/store/reducers/framesReducer';
import * as actions from '../src/store/actions/actionCreators';

const firstGridMock = [
  'rgba(17, 17, 17, 1)',
  'rgba(17, 17, 17, 1)',
  'rgba(34, 34, 34, 1)',
  'rgba(34, 34, 34, 1)',
  'rgba(34, 34, 34, 1)',
  'rgba(51, 51, 51, 1)'
];
const secondGridMock = [
  'rgba(255, 255, 255, 1)',
  'rgba(238, 238, 238, 1)',
  'rgba(238, 238, 238, 1)',
  'rgba(238, 238, 238, 1)',
  'rgba(238, 238, 238, 1)',
  'rgba(221, 221, 221, 1)'
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
const singletonFrameMock = framesMock;
const multipleFramesMock = () =>
  framesMock().setIn(
    ['list', 1],
    Map({
      grid: List(secondGridMock)
    })
  );

describe('reducer: SET_INITIAL_STATE', () => {
  describe('default options', () => {
    let nextState;
    beforeEach(() => {
      nextState = reducer(undefined, actions.setInitialState({}));
    });

    it('creates a singleton frame list', () => {
      expect(nextState.get('list').size).toEqual(1);
    });

    it('frame has an interval of 100%', () => {
      expect(nextState.getIn(['list', 0, 'interval'])).toEqual(100);
    });

    it('frame has a grid size of 400 (20 * 20)', () => {
      expect(nextState.getIn(['list', 0, 'grid']).size).toEqual(400);
    });

    it('the initial color of grid elements is empty string', () => {
      expect(nextState.getIn(['list', 0, 'grid', 0])).toEqual('');
      expect(nextState.getIn(['list', 0, 'grid', 169])).toEqual('');
      expect(nextState.getIn(['list', 0, 'grid', 399])).toEqual('');
    });
  });

  describe('specific options', () => {
    let nextState;
    beforeEach(() => {
      const options = { columns: 2, rows: 3 };
      nextState = reducer(undefined, actions.setInitialState(options));
    });

    it('creates a singleton frame list', () => {
      expect(nextState.get('list').size).toEqual(1);
    });

    it('frame has an interval of 100%', () => {
      expect(nextState.getIn(['list', 0, 'interval'])).toEqual(100);
    });

    it('frame has a grid size of 6 (2 * 3)', () => {
      expect(nextState.getIn(['list', 0, 'grid']).size).toEqual(6);
    });

    it('the initial color of grid elements is empty string', () => {
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
});

describe('reducer: NEW_PROJECT', () => {
  let nextState;
  beforeEach(() => {
    nextState = reducer(undefined, actions.newProject());
  });

  it('creates a singleton frame list', () => {
    expect(nextState.get('list').size).toEqual(1);
  });

  it('frame has an interval of 100%', () => {
    expect(nextState.getIn(['list', 0, 'interval'])).toEqual(100);
  });

  it('frame has a grid size of 400 (20 * 20)', () => {
    expect(nextState.getIn(['list', 0, 'grid']).size).toEqual(400);
  });

  it('the initial color of grid elements is empty string', () => {
    expect(nextState.getIn(['list', 0, 'grid', 111])).toEqual('');
    expect(nextState.getIn(['list', 0, 'grid', 222])).toEqual('');
    expect(nextState.getIn(['list', 0, 'grid', 333])).toEqual('');
  });
});

describe('framesReducer: CHANGE_ACTIVE_FRAME', () => {
  it('should set the given frame as active', () => {
    const frameIndex = 2;
    const state = Map({
      frames: Map({ activeIndex: 0 })
    });
    const nextState = reducer(state, actions.changeActiveFrame(frameIndex));

    expect(nextState.get('activeIndex')).toEqual(frameIndex);
  });
});

describe('framesReducer: REORDER_FRAME', () => {
  let state;
  let nextState;
  beforeEach(() => {
    state = multipleFramesMock();
  });

  describe('Moving a frame from left to right', () => {
    it('should set the desired frame after the target one', () => {
      nextState = reducer(state, actions.reorderFrame(0, 1));
      expect(nextState.getIn(['list', 1, 'grid']).toJS()).toEqual(
        firstGridMock
      );
    });
  });

  describe('Moving a frame from right to left', () => {
    it('should set the desired frame before the target one', () => {
      nextState = reducer(state, actions.reorderFrame(1, 0));
      expect(nextState.getIn(['list', 0, 'grid']).toJS()).toEqual(
        secondGridMock
      );
    });
  });

  it('should set the reordered frame as the active', () => {
    nextState = reducer(state, actions.reorderFrame(0, 1));
    expect(nextState.get('activeIndex')).toEqual(1);
  });
});

describe('framesReducer: CREATE_NEW_FRAME', () => {
  let nextState;
  beforeEach(() => {
    const state = framesMock();
    nextState = reducer(state, actions.createNewFrame());
  });

  it('creates a new frame at the end', () => {
    expect(nextState.getIn(['list', 1, 'grid']).toJS()).toEqual([
      '',
      '',
      '',
      '',
      '',
      ''
    ]);
  });

  it('changes the interval attributes', () => {
    expect(nextState.getIn(['list', 0, 'interval'])).toEqual(50);
    expect(nextState.getIn(['list', 1, 'interval'])).toEqual(100);
  });
});

describe('framesReducer: DELETE_FRAME', () => {
  const frameId = 0;
  it('does not remove frame if there is just one frame', () => {
    const state = singletonFrameMock();
    const nextState = reducer(state, actions.deleteFrame(frameId));
    expect(nextState.toJS()).toEqual(state.toJS());
  });

  it('removes frame with specified id if there are more than one frame', () => {
    const state = multipleFramesMock();
    const nextState = reducer(state, actions.deleteFrame(frameId));
    expect(nextState.getIn(['list', 0, 'grid']).toJS()).toEqual(secondGridMock);
    expect(nextState.getIn(['list', 0, 'interval'])).toEqual(100);
  });
});

describe('framesReducer: DUPLICATE_FRAME', () => {
  const frameId = 0;
  let nextState;
  beforeEach(() => {
    const state = multipleFramesMock();
    nextState = reducer(state, actions.duplicateFrame(frameId));
  });

  it('creates a new frame with the same grid colors', () => {
    expect(nextState.getIn(['list', frameId + 1, 'grid']).toJS()).toEqual(
      firstGridMock
    );
  });

  it('copied grid is not modified', () => {
    expect(nextState.getIn(['list', frameId, 'grid']).toJS()).toEqual(
      firstGridMock
    );
  });

  it('grids after id + 1 are moved one index to the right', () => {
    expect(nextState.getIn(['list', frameId + 2, 'grid']).toJS()).toEqual(
      secondGridMock
    );
  });

  it('changes the interval attributes', () => {
    expect(nextState.getIn(['list', 0, 'interval'])).toEqual(33.3);
    expect(nextState.getIn(['list', 1, 'interval'])).toEqual(66.7);
    expect(nextState.getIn(['list', 2, 'interval'])).toEqual(100);
  });
});

describe('framesReducer: CHANGE_DIMENSIONS', () => {
  describe('changing columns', () => {
    const gridProperty = 'columns';
    let state;
    let nextState;
    describe('number of columns increments', () => {
      beforeEach(() => {
        state = framesMock();
        nextState = reducer(state, actions.changeDimensions(gridProperty, 1));
      });

      it('adds a new grid column', () => {
        expect(nextState.getIn(['list', 0, 'grid']).toJS()).toEqual([
          firstGridMock[0],
          firstGridMock[1],
          '',
          firstGridMock[2],
          firstGridMock[3],
          '',
          firstGridMock[4],
          firstGridMock[5],
          ''
        ]);
      });

      it('columns value is incremented', () => {
        expect(nextState.get('columns')).toEqual(state.get('columns') + 1);
      });
    });

    describe('number of columns decrements', () => {
      beforeEach(() => {
        state = framesMock();
        nextState = reducer(state, actions.changeDimensions(gridProperty, -1));
      });

      it('removes a new grid column', () => {
        expect(nextState.getIn(['list', 0, 'grid']).toJS()).toEqual([
          firstGridMock[0],
          firstGridMock[2],
          firstGridMock[4]
        ]);
      });

      it('columns value is decremented', () => {
        expect(nextState.get('columns')).toEqual(state.get('columns') - 1);
      });
    });
  });

  describe('changing rows', () => {
    const gridProperty = 'rows';
    let state;
    let nextState;
    describe('number of rows increments', () => {
      beforeEach(() => {
        state = framesMock();
        nextState = reducer(state, actions.changeDimensions(gridProperty, 1));
      });

      it('adds a new grid row', () => {
        expect(nextState.getIn(['list', 0, 'grid']).toJS()).toEqual([
          firstGridMock[0],
          firstGridMock[1],
          firstGridMock[2],
          firstGridMock[3],
          firstGridMock[4],
          firstGridMock[5],
          '',
          ''
        ]);
      });

      it('rows value is incremented', () => {
        expect(nextState.get('rows')).toEqual(state.get('rows') + 1);
      });
    });

    describe('number of rows decrements', () => {
      beforeEach(() => {
        state = framesMock();
        nextState = reducer(state, actions.changeDimensions(gridProperty, -1));
      });

      it('removes a new grid column', () => {
        expect(nextState.getIn(['list', 0, 'grid']).toJS()).toEqual([
          firstGridMock[0],
          firstGridMock[1],
          firstGridMock[2],
          firstGridMock[3]
        ]);
      });

      it('rows value is decremented', () => {
        expect(nextState.get('rows')).toEqual(state.get('rows') - 1);
      });
    });
  });
});

describe('framesReducer: CHANGE_ACTIVE_FRAME', () => {
  it('changes the active frame', () => {
    const frameIndex = 2;
    const state = Map({
      frames: Map({ activeIndex: 0 })
    });
    const nextState = reducer(state, actions.changeActiveFrame(frameIndex));

    expect(nextState.get('activeIndex')).toEqual(frameIndex);
  });
});
