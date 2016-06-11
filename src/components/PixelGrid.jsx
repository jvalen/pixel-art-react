import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../store/actions/actionCreators';
import PixelCell from './PixelCell';

class PixelGrid extends React.Component {
  shouldComponentUpdate(nextProps) {
    const same = (key) => nextProps[key].get('grid').equals(this.props[key].get('grid'));
    if (same('activeFrame')) {
      return false;
    }
    return true;
  }

  getCells(props) {
    const { activeFrame, columns, currentColor } = props;
    const width = 100 / columns;

    return activeFrame.get('grid').map((currentCell, i) => {
      const color = currentCell.get('color');
      return (
        <PixelCell
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

const mapStateToProps = (state) => {
  const frames = state.present.get('frames');
  const activeFrameIndex = state.present.get('activeFrameIndex');
  return {
    activeFrame: frames.get(activeFrameIndex),
    columns: state.present.get('columns'),
    initialColor: state.present.get('initialColor'),
    currentColor: state.present.get('currentColor'),
    eyedropperOn: state.present.get('eyedropperOn'),
    eraserOn: state.present.get('eraserOn'),
    dragging: state.present.get('dragging')
  };
};

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actionCreators, dispatch)
});

const PixelGridContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(PixelGrid);
export default PixelGridContainer;
