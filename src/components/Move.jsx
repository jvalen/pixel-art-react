import React from 'react';
import { connect } from 'react-redux';
import { switchTool } from '../store/actions/actionCreators';
import { MOVE } from '../store/reducers/drawingToolStates';

const Move = ({ moveOn, switchMove }) => (
  <button
    type="button"
    aria-label="Move Tool"
    className={`move${moveOn ? ' selected' : ''}`}
    onClick={switchMove}
  />
);

const mapStateToProps = state => ({
  moveOn: state.present.get('drawingTool') === MOVE
});

const switchMoveAction = switchTool(MOVE);
const mapDispatchToProps = dispatch => ({
  switchMove: () => dispatch(switchMoveAction)
});

const MoveContainer = connect(mapStateToProps, mapDispatchToProps)(Move);
export default MoveContainer;
