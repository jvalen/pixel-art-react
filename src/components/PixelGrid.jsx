import React from 'react';
import PixelCell from './PixelCell';

const PixelGrid = ({
  cells, drawHandlers, extraClass
}) => (
  <div className={`grid-container ${extraClass}`}>
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
