import React from 'react';
import PixelGrid from './PixelGrid';

export default class GridWrapper extends React.Component {
  shouldComponentUpdate(newProps) {
    return newProps.cells !== this.props.cells;
  }

  render() {
    return (
      <PixelGrid
        cells={this.props.cells}
        extraClass={this.props.extraClass}
      />
    );
  }
}
