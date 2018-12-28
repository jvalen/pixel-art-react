import React from 'react';
import PixelCell from './PixelCell';

const PixelGrid = ({ cells, drawHandlers, classes }) => (
  <div className={classes} onTouchMove={drawHandlers.onTouchMove}>
    {cells.map(cell => (
      <PixelCell
        key={cell.id}
        cell={cell}
        id={cell.id}
        drawHandlers={drawHandlers}
        onFocus={(id, ev) => drawHandlers.onMouseOver(id, ev)}
      />
    ))}
  </div>
);
export default PixelGrid;
