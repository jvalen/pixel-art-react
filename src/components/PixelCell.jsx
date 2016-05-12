import React from 'react';

export default class PixelCell extends React.Component {
  shouldComponentUpdate(nextProps) {
    const needToUpdate = (
      (nextProps.color !== this.props.color) ||
      (nextProps.width !== this.props.width)
    );
    return needToUpdate;
  }

  render() {
    const { color, width, onMouseDown, onMouseUp, onMouseOver } = this.props;
    const selectedColor = color;

    const styles = {
      flex: `0 0 ${width}%`,
      paddingBottom: `${width}%`,
      backgroundColor: `#${selectedColor}`
    };

    return (
      <div
        className="grid-cell"
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onMouseOver={onMouseOver}
        style={styles}
      />
    );
  }
}
