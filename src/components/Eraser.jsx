import React from 'react';
import { connect } from 'react-redux';
import { switchTool } from '../store/actions/actionCreators';
import { ERASER } from '../store/reducers/drawingToolStates';

const Eraser = ({ eraserOn, switchEraser }) => (
  <button
    type="button"
    aria-label="Eraser Tool"
    className={`eraser${eraserOn ? ' selected' : ''}`}
    onClick={switchEraser}
  />
);

const mapStateToProps = state => ({
  eraserOn: state.present.get('drawingTool') === ERASER
});

const switchEraserAction = switchTool(ERASER);
const mapDispatchToProps = dispatch => ({
  switchEraser: () => dispatch(switchEraserAction)
});

const EraserContainer = connect(mapStateToProps, mapDispatchToProps)(Eraser);
export default EraserContainer;
