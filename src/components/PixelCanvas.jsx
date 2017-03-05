import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../store/actions/actionCreators';
import GridWrapper from './GridWrapper';

const PixelCanvas = (props) => {
  const cells = props.activeFrame.get('grid').map((currentCell, i) => {
    const color = currentCell.get('color');
    return {
      id: i,
      width: 100 / props.columns,
      color,
    };
  });

  const onCellEvent = id => props.actions.drawCell(id);

  let gridExtraClass = 'cell';
  if (props.eraserOn) {
    gridExtraClass = 'context-menu';
  } else if (props.eyedropperOn) {
    gridExtraClass = 'copy';
  }

  return (
    <GridWrapper
      cells={cells}
      onCellEvent={onCellEvent}
      extraClass={gridExtraClass}
    />
  );
};

const mapStateToProps = (state) => {
  const frames = state.present.get('frames');
  const activeFrameIndex = state.present.get('activeFrameIndex');
  return {
    activeFrame: frames.get(activeFrameIndex),
    columns: state.present.get('columns'),
    eyedropperOn: state.present.get('eyedropperOn'),
    eraserOn: state.present.get('eraserOn')
  };
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actionCreators, dispatch)
});

const PixelCanvasContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(PixelCanvas);
export default PixelCanvasContainer;
