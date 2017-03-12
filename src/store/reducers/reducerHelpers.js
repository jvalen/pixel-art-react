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
    { color: '#000000' },
    { color: '#ff0000' },
    { color: '#e91e63' },
    { color: '#9c27b0' },
    { color: '#673ab7' },
    { color: '#3f51b5' },
    { color: '#2196f3' },
    { color: '#03a9f4' },
    { color: '#00bcd4' },
    { color: '#009688' },
    { color: '#4caf50' },
    { color: '#8bc34a' },
    { color: '#cddc39' },
    { color: '#9ee07a' },
    { color: '#ffeb3b' },
    { color: '#ffc107' },
    { color: '#ff9800' },
    { color: '#ffcdd2' },
    { color: '#ff5722' },
    { color: '#795548' },
    { color: '#9e9e9e' },
    { color: '#607d8b' },
    { color: '#303f46' },
    { color: '#ffffff' },
    { color: '#383535' },
    { color: '#383534' },
    { color: '#383533' },
    { color: '#383532' },
    { color: '#383531' },
    { color: '#383530' }
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
