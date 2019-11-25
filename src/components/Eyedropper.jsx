import React from 'react';
import { connect } from 'react-redux';
import { switchTool } from '../store/actions/actionCreators';
import { EYEDROPPER } from '../store/reducers/drawingToolStates';

const Eyedropper = ({ eyedropperOn, switchEyedropper }) => (
  <button
    type="button"
    aria-label="Eyedropper Tool"
    className={`eyedropper${eyedropperOn ? ' selected' : ''}`}
    onClick={switchEyedropper}
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
