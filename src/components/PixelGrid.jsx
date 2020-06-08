import React from 'react';
import PixelCell from './PixelCell';

const PixelGrid = ({
  cells,
  drawHandlers,
  classes,
  nbrColumns,
  hoveredCell
}) => (
  <div className={classes} onTouchMove={drawHandlers.onTouchMove}>
    {cells.map(cell => (
      <PixelCell
        key={cell.id}
        cell={cell}
        id={cell.id}
        drawHandlers={drawHandlers}
        onFocus={(id, ev) => drawHandlers.onMouseOver(id, ev)}
        nbrColumns={nbrColumns}
        hoveredCell={hoveredCell}
      />
    ))}
  </div>
);
export default PixelGrid;
