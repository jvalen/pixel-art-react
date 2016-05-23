import React from 'react';
import PixelGrid from 'pixel-grid-react';

export default ({ actions, grid }) => {
  const cells = grid.toJS().map((cell, i) => {
    return {
      color: `#${cell.color}`,
      width: 5,
      id: i
    };
  });
  const onCellEvent = id => {
    actions.drawCell(id);
  };
  return (
    <PixelGrid
      cells={cells}
      onCellEvent={onCellEvent}
    />
  );
};
