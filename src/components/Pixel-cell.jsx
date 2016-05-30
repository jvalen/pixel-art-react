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
      width: `${width}%`,
      paddingBottom: `${width}%`,
      backgroundColor: `#${selectedColor}`
    };

    return (
      <div
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onMouseOver={onMouseOver}
        style={styles}
      />
    );
  }
}
