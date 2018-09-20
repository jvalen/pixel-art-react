import React from 'react';
import PixelGrid from './PixelGrid';

export default class GridWrapper extends React.Component {
  constructor(props) {
    super(props);
    const update = this.props.onCellEvent.bind(this);
    this.drawHandlers = props.drawHandlersFactory(update);
  }

  shouldComponentUpdate(newProps) {
    return newProps.cells !== this.props.cells;
  }

  render() {
    const { props } = this;
    return (
      <PixelGrid
        cells={props.cells}
        drawHandlers={this.drawHandlers}
        extraClass={props.extraClass}
      />
    );
  }
}
