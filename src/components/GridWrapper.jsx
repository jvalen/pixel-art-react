import React from 'react';
import PixelGrid from './PixelGrid';

export default class GridWrapper extends React.Component {
  shouldComponentUpdate(newProps) {
    const { cells } = this.props;
    return newProps.cells !== cells;
  }

  onMouseOver(ev) {
    const { activeTool, drawHandlers } = this.props;
    if (activeTool === 'MOVE') {
      drawHandlers.onMoveMouseOver(ev);
    }
  }

  onMouseDown(ev) {
    const { activeTool, drawHandlers } = this.props;
    if (activeTool === 'MOVE') {
      drawHandlers.onMoveMouseDown(ev);
    }
  }

  onTouchStart(ev) {
    const { activeTool, drawHandlers } = this.props;
    if (activeTool === 'MOVE') {
      drawHandlers.onMoveTouchStart(ev);
    }
  }

  onTouchMove(ev) {
    const { activeTool, drawHandlers } = this.props;
    if (activeTool === 'MOVE') {
      drawHandlers.onMoveTouchMove(ev);
    }
  }

  render() {
    const { props } = this;
    return (
      <div
        onMouseOver={ev => this.onMouseOver(ev)}
        onFocus={ev => this.onMouseOver(ev)}
        onMouseDown={ev => this.onMouseDown(ev)}
        onTouchStart={ev => this.onTouchStart(ev)}
        onTouchMove={ev => this.onTouchMove(ev)}
      >
        <PixelGrid
          cells={props.cells}
          drawHandlers={props.drawHandlers}
          classes={props.classes}
          nbrColumns={props.nbrColumns}
          hoveredCell={props.hoveredCell}
        />
      </div>
    );
  }
}
