import React from 'react';

export default class PixelCell extends React.Component {
  shouldComponentUpdate(nextProps) {
    const keys = ['color', 'width'];
    const isSame = keys.every(key => this.props.cell[key] === nextProps.cell[key]);
    return !isSame;
  }
  render() {
    const { id, cell: { color, width }, onMouseDown, onMouseUp, onMouseOver } = this.props;
    const styles = {
      width: `${width}%`,
      paddingBottom: `${width}%`,
      backgroundColor: color
    };

    return (
      <div
        onMouseDown={() => onMouseDown(id)}
        onMouseUp={() => onMouseUp(id)}
        onMouseOver={() => onMouseOver(id)}
        style={styles}
      />
    );
  }
}
