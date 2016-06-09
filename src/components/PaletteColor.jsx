import React from 'react';

const PaletteColor = (props) => {
  const handleClick = () => {
    props.actions.setColorSelected(props.color);
  };

  const { width, color } = props;
  const cellColor = color;

  const styles = {
    width: `${width}%`,
    paddingBottom: `${width}%`,
    backgroundColor: cellColor
  };

  return (
    <div
      className={
        `palette-color
        ${props.currentColor === cellColor ? 'selected' : ''}`
      }
      style={styles}
      onClick={() => { handleClick(); }}
    />
  );
};

export default PaletteColor;
