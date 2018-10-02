import React from 'react';
import { connect } from 'react-redux';
import { switchTool } from '../store/actions/actionCreators';
import { EYEDROPPER } from '../store/reducers/drawingToolStates';

const Eyedropper = props => (
  <button
    className={`eyedropper${props.eyedropperOn ? ' selected' : ''}`}
    onClick={props.switchEyedropper}
  />
);

const mapStateToProps = state => ({
  eyedropperOn: state.present.get('drawingTool') === EYEDROPPER
});

const switchEyedropperAction = switchTool(EYEDROPPER);
const mapDispatchToProps = dispatch => ({
  switchEyedropper: () => dispatch(switchEyedropperAction)
});

const EyedropperContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Eyedropper);
export default EyedropperContainer;
