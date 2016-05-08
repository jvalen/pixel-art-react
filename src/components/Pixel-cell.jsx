import React from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../action_creators';

const PixelCell = (props) => {
  const drawCell = () => {
    if (!props.eraserOn && !props.eyedropperOn) {
      // Apply the new color
      props.setGridCellValue(
        props.currentColor,
        true,
        props.id
      );
    } else if (props.eraserOn) {
      // Color removed
      props.setGridCellValue(
        props.initialColor,
        false,
        props.id);
    } else if (props.eyedropperOn) {
      // Eyedropper
      props.setColorSelected(props.color);
    }
  };

  const handleDrag = (event) => {
    // If currently dragging
    if (props.dragging) {
      props.endDrag();
      drawCell(event);
      props.startDrag();
    }
  };

  const handleMouseDown = (event) => {
    drawCell(event);
    props.startDrag();
  };

  const { color, width } = props;
  const selectedColor = color;
  let customCursor = 'cell';

  if (props.eraserOn) {
    customCursor = 'context-menu';
  } else if (props.eyedropperOn) {
    customCursor = 'copy';
  }

  const styles = {
    cellWrapper: {
      display: 'inline-block',
      width: `${width}%`,
      boxSizing: 'border-box'
    },
    cell: {
      backgroundColor: `#${selectedColor}`,
      color: 'white',
      position: 'relative',
      width: '100%',
      paddingBottom: '100%',
      cursor: customCursor,
      border: '1px solid #585858'
    }
  };

  return (
    <div className="cellWrapper" style={styles.cellWrapper}>
      <div
        className="cell"
        onMouseDown={(event) => { handleMouseDown(event); }}
        onMouseUp={props.endDrag}
        onMouseOver={(event) => { handleDrag(event); }}
        style={styles.cell}
      />
    </div>
  );
};

function mapStateToProps(state) {
  return {
    initialColor: state.present.get('initialColor'),
    eyedropperOn: state.present.get('eyedropperOn'),
    eraserOn: state.present.get('eraserOn'),
    dragging: state.present.get('dragging')
  };
}
export const PixelCellContainer = connect(
  mapStateToProps,
  actionCreators
)(PixelCell);
