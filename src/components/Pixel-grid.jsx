import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as actionCreators from '../action_creators';
import Cell from './Pixel-cell';

class Grid extends React.Component {
  shouldComponentUpdate(nextProps) {
    const same = (key) => { return nextProps[key].equals(this.props[key]); };
    if (same('grid')) {
      // console.info('No need to render the grid!');
      return false;
    }
    return true;
  }

  getCells(props) {
    const { grid, columns, currentColor } = this.props;
    const width = 100 / columns;
    return grid.toJS().map((currentCell, i) => {
      return (
        <Cell
          key={i}
          id={i}
          width={width}
          color={currentCell.color}
          currentColor={currentColor}
          onMouseDown={() => { this.handleMouseDown(i); }}
          onMouseUp={() => { props.actions.endDrag(); }}
          onMouseOver={() => { this.handleDrag(i); }}
        />
      );
    });
  }
  handleDrag(id) {
    // If currently dragging
    if (this.props.dragging) {
      this.props.actions.endDrag();
      this.drawCell(id);
      this.props.actions.startDrag();
    }
  }
  handleClick(id) {
    this.drawCell(id);
  }
  handleMouseDown(id) {
    this.drawCell(id);
    this.props.actions.startDrag();
  }

  drawCell(id) {
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
      this.props.actions.setColorSelected(this.props.color);
    }
  }

  render() {
    let customCursor = 'cell';

    if (this.props.eraserOn) {
      customCursor = 'context-menu';
    } else if (this.props.eyedropperOn) {
      customCursor = 'copy';
    }
    const style = {
      lineHeight: '0px',
      minHeight: '1px',
      margin: '0 auto',
      width: '80%',
      cursor: customCursor
    };
    // console.info('Rendering the grid!', this.props);
    return (
      <div className="grid-container" style={style}>
        {this.getCells(this.props)}
      </div>
    );
  }
}

function mapStateToProps(state) {
  // console.info('grid, mapStateToProps', state.present.toJS());
  return {
    initialColor: state.present.get('initialColor'),
    eyedropperOn: state.present.get('eyedropperOn'),
    eraserOn: state.present.get('eraserOn'),
    dragging: state.present.get('dragging')
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
