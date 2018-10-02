import { List } from 'immutable';

export const GRID_INITIAL_COLOR = '#313131';

function isSameColor(colorA, colorB) {
  return (colorA || GRID_INITIAL_COLOR) === (colorB || GRID_INITIAL_COLOR);
}

function getSameColorAdjacentCells(frameGrid, columns, rows, id, color) {
  const adjacentCollection = [];
  let auxId;

  if ((id + 1) % columns !== 0) {
    // Not at the very right
    auxId = id + 1;
    if (isSameColor(frameGrid.get(auxId), color)) {
      adjacentCollection.push(auxId);
    }
  }
  if (id % columns !== 0) {
    // Not at the very left
    auxId = id - 1;
    if (isSameColor(frameGrid.get(auxId), color)) {
      adjacentCollection.push(auxId);
    }
  }
  if (id >= columns) {
    // Not at the very top
    auxId = id - columns;
    if (isSameColor(frameGrid.get(auxId), color)) {
      adjacentCollection.push(auxId);
    }
  }
  if (id < (columns * rows) - columns) {
    // Not at the very bottom
    auxId = id + columns;
    if (isSameColor(frameGrid.get(auxId), color)) {
      adjacentCollection.push(auxId);
    }
  }

  return adjacentCollection;
}

export function create(numCells) {
  let newGrid = List();
  // Set every cell with the initial color
  for (let i = 0; i < numCells; i++) {
    newGrid = newGrid.push('');
  }
  return newGrid;
}

export function drawPixel(grid, color, id) {
  return grid.set(id, color);
}

export function resize(grid, gridProperty, increment, dimensions) {
  const totalCells = dimensions.rows * dimensions.columns;
  let newGrid = grid;

  if (gridProperty === 'columns') {
    // Resize by columns
    if (increment > 0) {
      // Add a row at the end
      for (let i = totalCells; i > 0; i -= dimensions.columns) {
        newGrid = newGrid.insert(i, '');
      }
    } else {
      for (let i = totalCells; i > 0; i -= dimensions.columns) {
        newGrid = newGrid.splice(i - 1, 1);
      }
    }
  } else if (gridProperty === 'rows') {
    // Resize by rows
    if (increment > 0) {
      // Add a row at the end
      for (let i = 0; i < dimensions.columns; i++) {
        newGrid = newGrid.push('');
      }
    } else {
      // Remove the last row
      for (let i = 0; i < dimensions.columns; i++) {
        newGrid = newGrid.splice(-1, 1);
      }
    }
  }

  return newGrid;
}

export function applyBucket(grid, {
  id, cellColor, paletteColor, columns, rows
}) {
  const queue = [id];
  let currentId;
  let newGrid = grid;
  let adjacents;
  let auxAdjacentId;
  let auxAdjacentColor;

  while (queue.length > 0) {
    currentId = queue.shift();
    newGrid = drawPixel(newGrid, paletteColor, currentId);
    adjacents = getSameColorAdjacentCells(newGrid, columns, rows, currentId, cellColor);

    for (let i = 0; i < adjacents.length; i++) {
      auxAdjacentId = adjacents[i];
      auxAdjacentColor = newGrid.get(auxAdjacentId);
      // Avoid introduce repeated or painted already cell into the queue
      if (
        (queue.indexOf(auxAdjacentId) === -1) &&
        (auxAdjacentColor !== paletteColor)
      ) {
        queue.push(auxAdjacentId);
      }
    }
  }

  return newGrid;
}
