import React from 'react';
import PixelGrid from './PixelGrid';

export default class GridWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dragging: false
    };
    this.update = this.props.onCellEvent.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseOver = this.handleMouseOver.bind(this);
    this.handleTouchMove = this.handleTouchMove.bind(this);
  }

  shouldComponentUpdate(newProps) {
    return newProps.cells !== this.props.cells;
  }

  handleMouseUp(id, ev) {
    ev.preventDefault();
    this.setState({
      dragging: false
    });
  }

  handleMouseDown(id, ev) {
    ev.preventDefault();
    if (!this.state.dragging) this.update(id);
    this.setState({
      dragging: true
    });
  }

  handleMouseOver(id, ev) {
    ev.preventDefault();
    if (this.state.dragging) this.update(id);
  }

  handleTouchMove(id, ev) {
    /*
      TODO: It should draw the every cell we are moving over
      like is done in handleMouseOver. But is not working due
      to the nature of the touch events.

      The target element in a touch event is always the one
      when the touch started, not the element under the cursor
      (like the mouse event behaviour)
    */
    ev.preventDefault();
    if (this.state.dragging) this.update(id);
  }

  render() {
    return (
      <PixelGrid
        cells={this.props.cells}
        onMouseUp={this.handleMouseUp}
        onMouseDown={this.handleMouseDown}
        onMouseOver={this.handleMouseOver}
        onTouchMove={this.handleTouchMove}
        extraClass={this.props.extraClass}
      />
    );
  }
}
