import React from 'react';

const GRID_INITIAL_COLOR = 'rgba(49, 49, 49, 1)';

export default class PixelCell extends React.Component {
  shouldComponentUpdate(nextProps) {
    const { cell } = this.props;
    const keys = ['color', 'width'];
    const isSame = keys.every(key => cell[key] === nextProps.cell[key]);
    return !isSame;
  }

  render() {
    const {
      cell: { color, width },
      id,
      drawHandlers: { onMouseDown, onMouseOver }
    } = this.props;
    const styles = {
      width: `${width}%`,
      paddingBottom: `${width}%`,
      backgroundColor: color || GRID_INITIAL_COLOR
    };

    return (
      <div
        onMouseDown={ev => onMouseDown(id, ev)}
        onMouseOver={ev => onMouseOver(id, ev)}
        onFocus={ev => onMouseOver(id, ev)}
        onTouchStart={ev => onMouseDown(id, ev)}
        style={styles}
      />
    );
  }
}
