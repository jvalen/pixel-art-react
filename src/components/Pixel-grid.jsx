import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as actionCreators from '../action_creators';
import Cell from './Pixel-cell';

class Grid extends React.Component {
  shouldComponentUpdate(nextProps) {
    const same = (key) => { return nextProps[key].equals(this.props[key]); };
    if (same('activeFrame')) {
      // console.info('No need to render the grid!');
      return false;
    }
    return true;
  }

  getCells(props) {
    const { activeFrame, columns, currentColor } = props;
    const width = 100 / columns;

    return activeFrame.map((currentCell, i) => {
      const color = currentCell.get('color');
      return (
        <Cell
          key={i}
          id={i}
          width={width}
          color={color}
          currentColor={currentColor}
          onMouseDown={() => { this.handleMouseDown(i, color); }}
          onMouseUp={() => { props.actions.endDrag(); }}
          onMouseOver={() => { this.handleDrag(i, color); }}
        />
      );
    });
  }
  handleDrag(id, color) {
    // If currently dragging
    if (this.props.dragging) {
      this.props.actions.endDrag();
      this.drawCell(id, color);
      this.props.actions.startDrag();
    }
  }

  handleMouseDown(id, color) {
    this.drawCell(id, color);
    this.props.actions.startDrag();
  }

  drawCell(id, color) {
    if (!this.props.eraserOn && !this.props.eyedropperOn) {
      // Apply the new color
      this.props.actions.setGridCellValue(
        this.props.currentColor,
        true,
        id);
    } else if (this.props.eraserOn) {
      // Color removed
      this.props.actions.setGridCellValue(
        this.props.initialColor,
        false,
        id
      );
    } else if (this.props.eyedropperOn) {
      // Eyedropper
      this.props.actions.setColorSelected(color);
    }
  }

  render() {
    let customCursor = 'cell';

    if (this.props.eraserOn) {
      customCursor = 'context-menu';
    } else if (this.props.eyedropperOn) {
      customCursor = 'copy';
    }

    return (
      <div className={`pixel-grid ${customCursor}`}>
        {this.getCells(this.props)}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    initialColor: state.present.get('initialColor')
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actionCreators, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Grid);
