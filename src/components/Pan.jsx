import React from 'react';
import { connect } from 'react-redux';
import { switchTool } from '../store/actions/actionCreators';
import { PAN } from '../store/reducers/drawingToolStates';

const Pan = ({ panOn, switchPan }) => (
  <button
    type="button"
    aria-label="Pan Tool"
    className={`pan${panOn ? ' selected' : ''}`}
    onClick={switchPan}
  />
);

const mapStateToProps = state => ({
  panOn: state.present.get('drawingTool') === PAN
});

const switchPanAction = switchTool(PAN);
const mapDispatchToProps = dispatch => ({
  switchPan: () => dispatch(switchPanAction)
});

const PanContainer = connect(mapStateToProps, mapDispatchToProps)(Pan);
export default PanContainer;
