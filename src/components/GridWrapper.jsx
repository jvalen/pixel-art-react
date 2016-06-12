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
  }

  shouldComponentUpdate(newProps) {
    return newProps.cells !== this.props.cells;
  }

  handleMouseUp() {
    this.setState({
      dragging: false
    });
  }

  handleMouseDown(id) {
    if (!this.state.dragging) this.update(id);
    this.setState({
      dragging: true
    });
  }

  handleMouseOver(id) {
    if (this.state.dragging) this.update(id);
  }

  render() {
    return (
      <PixelGrid
        cells={this.props.cells}
        onMouseUp={this.handleMouseUp}
        onMouseDown={this.handleMouseDown}
        onMouseOver={this.handleMouseOver}
        extraClass={this.props.extraClass}
      />
    );
  }
}
