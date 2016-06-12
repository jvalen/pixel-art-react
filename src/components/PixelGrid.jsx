import React from 'react';
import PixelCell from './PixelCell';

const PixelGrid = ({ cells, onMouseUp, onMouseDown, onMouseOver, extraClass }) => (
  <div className={`grid-container ${extraClass}`}>
    {cells.map((cell, i) => (
      <PixelCell
        key={i}
        cell={cell}
        id={i}
        onMouseUp={(id) => onMouseUp(id)}
        onMouseDown={(id) => onMouseDown(id)}
        onMouseOver={(id) => onMouseOver(id)}
      />
    ))}
  </div>
);
export default PixelGrid;
