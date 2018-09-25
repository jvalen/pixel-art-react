import { List, Map } from 'immutable';

function getPositionFirstMatchInPalette(grid, color) {
  return grid.findIndex(currentColor => currentColor.get('color') === color);
}

function isColorInPalette(grid, color) {
  return getPositionFirstMatchInPalette(grid, color) !== -1;
}

function addColorToLastGridCell(grid, newColor) {
  const lastPosition = grid.size - 1;
  return grid.set(lastPosition, Map({
    color: newColor, id: lastPosition
  }));
}

function createPaletteGrid() {
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

function isPaletteColorSelected(palette) {
  return palette.get('currentColor').get('color');
}

function resetPaletteSelectedColorState(palette) {
  const currentColor = palette.getIn(['grid', 0, 'color']);
  return palette.set('currentColor', Map({ color: currentColor, position: 0 }));
}

export function create() {
  return Map({
    currentColor: Map({ color: '#000000', position: 0 }),
    grid: createPaletteGrid()
  });
}

export function prepare(palette) {
  if (!isPaletteColorSelected(palette)) {
    return resetPaletteSelectedColorState(palette);
  }
  return palette;
}

export function selectColor(palette, color) {
  return palette.set('currentColor', color);
}

export function eyedropColor(palette, selectedColor) {
  let currentColor = Map({ color: selectedColor });
  let grid = palette.get('grid');

  if (!isColorInPalette(grid, selectedColor)) {
    grid = addColorToLastGridCell(grid, selectedColor);
    currentColor = currentColor.set('position', grid.size - 1);
  } else {
    currentColor = currentColor.set('position', getPositionFirstMatchInPalette(grid, selectedColor));
  }

  return palette.merge({
    currentColor,
    grid
  });
}

export function setCustomColor(palette, customColor) {
  const {
    currentColor, grid
  } = palette.toObject();
  let newColor = Map({
    color: customColor,
    position: currentColor.get('position')
  });
  let newGrid;

  if (!isColorInPalette(grid, currentColor.get('color'))) {
    // If there is no colorSelected in the palette it will create one
    newGrid = addColorToLastGridCell(grid, customColor);
    newColor = newColor.set('position', newGrid.size - 1);
  } else {
    // There is a color selected in the palette
    newGrid = grid.set(
      currentColor.get('position'),
      Map({
        color: customColor, id: currentColor.get('color')
      })
    );
  }

  return palette.merge({
    currentColor: newColor,
    grid: newGrid
  });
}
