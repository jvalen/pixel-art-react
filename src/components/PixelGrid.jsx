import React from 'react';
import PixelCell from './PixelCell';

const PixelGrid = ({
  cells, onMouseUp, onMouseDown, onMouseOver, onTouchMove, extraClass
}) => (
  <div className={`grid-container ${extraClass}`}>
    {cells.map((cell, i) => (
      <PixelCell
        key={i}
        cell={cell}
        id={i}
        onMouseUp={(id, ev) => onMouseUp(id, ev)}
        onMouseDown={(id, ev) => onMouseDown(id, ev)}
        onMouseOver={(id, ev) => onMouseOver(id, ev)}
        onTouchMove={(id, ev) => onTouchMove(id, ev)}
      />
    ))}
  </div>
);
export default PixelGrid;
