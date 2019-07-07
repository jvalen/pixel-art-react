import React from 'react';
import PixelGrid from './PixelGrid';

export default class GridWrapper extends React.Component {
  shouldComponentUpdate(newProps) {
    const { cells } = this.props;
    return newProps.cells !== cells;
  }

  render() {
    const { props } = this;
    return (
      <PixelGrid
        cells={props.cells}
        drawHandlers={props.drawHandlers}
        classes={props.classes}
      />
    );
  }
}
