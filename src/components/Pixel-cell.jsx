import React from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../action_creators';

export class PixelCell extends React.Component {
  handleDrag(event) {
    // If currently dragging
    if (this.props.dragging) {
      this.props.endDrag();
      this.drawCell(event);
      this.props.startDrag();
    }
  }

  handleClick(event) {
    this.drawCell(event);
  }

  handleMouseDown(event) {
    this.drawCell(event);
    this.props.startDrag();
  }

  drawCell() {
    if (!this.props.eraserOn && !this.props.eyedropperOn) {
      // Apply the new color
      this.props.setGridCellValue(
        this.props.currentColor,
        true,
        this.props.id);
    } else if (this.props.eraserOn) {
      // Color removed
      this.props.setGridCellValue(
        this.props.initialColor,
        false,
        this.props.id);
    } else if (this.props.eyedropperOn) {
      // Eyedropper
      this.props.setColorSelected(this.props.color);
    }
  }

  render() {
    const { color, width } = this.props;
    const selectedColor = color;
    let customCursor = 'cell';

    if (this.props.eraserOn) {
      customCursor = 'context-menu';
    } else if (this.props.eyedropperOn) {
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
          onMouseDown={(event) => { this.handleMouseDown(event); }}
          onMouseUp={this.props.endDrag}
          onMouseOver={(event) => { this.handleDrag(event); }}
          style={styles.cell}
        />
      </div>
    );
  }
}

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
