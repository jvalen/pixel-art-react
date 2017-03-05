import React from 'react';

const PaletteColor = (props) => {
  const { positionInPalette, width, color, selected, actions } = props;

  const handleClick = () => {
    actions.setColorSelected(color, positionInPalette);
  };

  const cellColor = color;
  const styles = {
    width: `${width}%`,
    paddingBottom: `${width}%`,
    backgroundColor: cellColor
  };

  return (
    <button
      className={
        `palette-color
        ${selected ? 'selected' : ''}`
      }
      style={styles}
      onClick={() => { handleClick(); }}
    />
  );
};

export default PaletteColor;
