import { List, Map } from 'immutable';
import shortid from 'shortid';

export function createGrid(cellsCount, initialColor, intervalPercentage) {
  let newGrid = List();
  // Set every cell with the initial color
  for (let i = 0; i < cellsCount; i++) {
    newGrid = newGrid.push(Map({ color: initialColor, used: false }));
  }
  return Map({ grid: newGrid, interval: intervalPercentage, key: shortid.generate() });
}

export function resizeGrid(frame, gridProperty, behaviour, initialColor, dimensions) {
  const totalCells = dimensions.rows * dimensions.columns;
  let currentFrameGrid = frame;

  if (gridProperty === 'columns') {
    // Resize by columns
    if (behaviour === 'add') {
      // Add a row at the end
      for (let i = totalCells; i > 0; i -= dimensions.columns) {
        currentFrameGrid = currentFrameGrid.splice(i, 0, Map({ color: initialColor, used: false }));
      }
    } else {
      for (let i = totalCells; i > 0; i -= dimensions.columns) {
        currentFrameGrid = currentFrameGrid.splice(i - 1, 1);
      }
    }
  } else if (gridProperty === 'rows') {
    // Resize by rows
    if (behaviour === 'add') {
      // Add a row at the end
      for (let i = 0; i < dimensions.columns; i++) {
        currentFrameGrid = currentFrameGrid.push(Map({ color: initialColor, used: false }));
      }
    } else {
      // Remove the last row
      for (let i = 0; i < dimensions.columns; i++) {
        currentFrameGrid = currentFrameGrid.splice(-1, 1);
      }
    }
  }

  return currentFrameGrid;
}

export function cloneGrid(grid, interval) {
  return Map({ grid, interval, key: shortid.generate() });
}

export function createPalette() {
  const paletteColors = [
    { color: '#000000', id: 0 },
    { color: '#ff0000', id: 1 },
    { color: '#e91e63', id: 2 },
    { color: '#9c27b0', id: 3 },
    { color: '#673ab7', id: 4 },
    { color: '#3f51b5', id: 5 },
    { color: '#2196f3', id: 6 },
    { color: '#03a9f4', id: 7 },
    { color: '#00bcd4', id: 8 },
    { color: '#009688', id: 9 },
    { color: '#4caf50', id: 10 },
    { color: '#8bc34a', id: 11 },
    { color: '#cddc39', id: 12 },
    { color: '#9ee07a', id: 13 },
    { color: '#ffeb3b', id: 14 },
    { color: '#ffc107', id: 15 },
    { color: '#ff9800', id: 16 },
    { color: '#ffcdd2', id: 17 },
    { color: '#ff5722', id: 18 },
    { color: '#795548', id: 19 },
    { color: '#9e9e9e', id: 20 },
    { color: '#607d8b', id: 21 },
    { color: '#303f46', id: 22 },
    { color: '#ffffff', id: 23 },
    { color: '#383535', id: 24 },
    { color: '#383534', id: 25 },
    { color: '#383533', id: 26 },
    { color: '#383532', id: 27 },
    { color: '#383531', id: 28 },
    { color: '#383530', id: 29 }
  ];
  let newGrid = List();
  for (let i = 0; i < paletteColors.length; i++) {
    newGrid = newGrid.push(Map(paletteColors[i]));
  }
  return newGrid;
}

export function checkColorInPalette(palette, color) {
  const sameColors = palette.filter(currentColor =>
    (currentColor.get('color') === color)
  );
  return (sameColors.size > 0);
}

export function getPositionFirstMatchInPalette(palette, color) {
  return palette.reduce((acc, currentColor, index) => {
    let currentPosition = acc;
    if (currentPosition === -1 && currentColor.get('color') === color) {
      currentPosition = index;
    }
    return currentPosition;
  }, -1);
}

export function addColorToLastCellInPalette(palette, newColor) {
  return palette.map((currentColor, i, collection) => {
    if (i === collection.size - 1) {
      // Last cell
      return (Map({ color: newColor }));
    }
    return (Map({ color: currentColor.get('color') }));
  });
}

export function resetIntervals(frames) {
  const equalPercentage = 100 / frames.size;

  return frames.reduce((acc, frame, index) => {
    const percentage = index ===
      frames.size - 1 ? 100 : Math.round(((index + 1) * equalPercentage) * 10) / 10;
    return acc.push(Map({ grid: frame.get('grid'), interval: percentage, key: frame.get('key') }));
  }, List([]));
}

export function setGridCellValue(state, color, used, id) {
  return state.setIn(
    ['frames', state.get('activeFrameIndex'), 'grid', id],
    Map({ color, used })
  );
}

function getSameColorAdjacentCells(frameGrid, columns, rows, id, color) {
  const adjacentCollection = [];
  let auxId;

  if ((id + 1) % columns !== 0) {
    // Not at the very right
    auxId = id + 1;
    if (frameGrid.get(auxId).get('color') === color) {
      adjacentCollection.push(auxId);
    }
  }
  if (id % columns !== 0) {
    // Not at the very left
    auxId = id - 1;
    if (frameGrid.get(auxId).get('color') === color) {
      adjacentCollection.push(auxId);
    }
  }
  if (id >= columns) {
    // Not at the very top
    auxId = id - columns;
    if (frameGrid.get(auxId).get('color') === color) {
      adjacentCollection.push(auxId);
    }
  }
  if (id < (columns * rows) - columns) {
    // Not at the very bottom
    auxId = id + columns;
    if (frameGrid.get(auxId).get('color') === color) {
      adjacentCollection.push(auxId);
    }
  }

  return adjacentCollection;
}

export function applyBucket(state, activeFrameIndex, id, sourceColor) {
  const columns = state.get('columns');
  const rows = state.get('rows');
  const queue = [id];
  let currentColor = state.get('currentColor').get('color');
  let currentId;
  let newState = state;
  let adjacents;
  let auxAdjacentId;
  let auxAdjacentColor;

  if (!currentColor) {
    // If there is no color selected in the palette, it will choose the first one
    currentColor = newState.getIn(['paletteGridData', 0, 'color']);
    newState = newState.set('currentColor', Map({ color: currentColor, position: 0 }));
  }

  while (queue.length > 0) {
    currentId = queue.shift();
    newState = setGridCellValue(newState, currentColor, true, currentId);
    adjacents = getSameColorAdjacentCells(
      newState.getIn(
        ['frames', activeFrameIndex, 'grid']
      ),
      columns, rows, currentId, sourceColor
    );

    for (let i = 0; i < adjacents.length; i++) {
      auxAdjacentId = adjacents[i];
      auxAdjacentColor = newState.getIn(
        ['frames', activeFrameIndex, 'grid', auxAdjacentId, 'color']
      );
      // Avoid introduce repeated or painted already cell into the queue
      if (
        (queue.indexOf(auxAdjacentId) === -1) &&
        (auxAdjacentColor !== currentColor)
      ) {
        queue.push(auxAdjacentId);
      }
    }
  }

  return newState;
}
