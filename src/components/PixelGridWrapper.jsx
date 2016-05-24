import React from 'react';
import PixelGrid from 'pixel-grid-react';

export default ({ actions, grid, columns }) => {
  const cells = grid.toJS().map(cell => {
    return {
      color: `#${cell.color}`,
      width: 100 / columns
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
