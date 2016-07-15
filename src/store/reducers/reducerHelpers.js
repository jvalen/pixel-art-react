import { List, Map } from 'immutable';

export function createGrid(cellsCount, initialColor, intervalPercentage) {
  let newGrid = List();
  // Set every cell with the initial color
  for (let i = 0; i < cellsCount; i++) {
    newGrid = newGrid.push(Map({ color: initialColor, used: false }));
  }
  return Map({ grid: newGrid, interval: intervalPercentage });
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
  } else {
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
  const sameColors = palette.filter((currentColor) =>
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
    return acc.push(Map({ grid: frame.get('grid'), interval: percentage }));
  }, List([]));
}

export function setGridCellValue(state, color, used, id) {
  return state.setIn(
    ['frames', state.get('activeFrameIndex'), 'grid', id],
    Map({ color, used })
  );
}
