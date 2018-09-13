import React from 'react';
import PixelCell from './PixelCell';

const PixelGrid = ({
  cells, extraClass
}) => (
  <div className={`grid-container ${extraClass}`}>
    {cells.map(cell => (
      <PixelCell
        key={cell.id}
        cell={cell}
        id={cell.id}
      />
    ))}
  </div>
);
export default PixelGrid;
