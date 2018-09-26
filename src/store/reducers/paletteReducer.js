import { List, Map, fromJS } from 'immutable';
import * as types from '../actions/actionTypes';
import { GRID_INITIAL_COLOR } from './pixelGrid';
import { PENCIL, BUCKET, EYEDROPPER } from './drawingToolStates';

const getPositionFirstMatchInPalette = (grid, color) =>
  grid.findIndex(currentColor => currentColor.get('color') === color);

const isColorInPalette = (grid, color) =>
  getPositionFirstMatchInPalette(grid, color) !== -1;

const disableColorWhenEraser = (palette, action) => {
  if (action.tool === 'ERASER') {
    return palette.set('currentColor', Map({
      color: null, position: -1
    }));
  }
  return palette;
};

const addColorToLastGridCell = (grid, newColor) => {
  const lastPosition = grid.size - 1;
  return grid.set(lastPosition, Map({
    color: newColor, id: lastPosition
  }));
};

const createPaletteGrid = () => {
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
};

const isColorSelected = palette => palette.get('currentColor').get('color');

const resetSelectedColorState = (palette) => {
  const currentColor = palette.getIn(['grid', 0, 'color']);
  return palette.set('currentColor', Map({ color: currentColor, position: 0 }));
};

const createPalette = () => Map({
  currentColor: Map({ color: '#000000', position: 0 }),
  grid: createPaletteGrid()
});

const getCellColor = ({ color }) => color || GRID_INITIAL_COLOR;

const eyedropColor = (palette, action) => {
  const cellColor = getCellColor(action);
  let currentColor = Map({ color: cellColor });
  let grid = palette.get('grid');

  if (!isColorInPalette(grid, cellColor)) {
    grid = addColorToLastGridCell(grid, cellColor);
    currentColor = currentColor.set('position', grid.size - 1);
  } else {
    currentColor = currentColor.set('position', getPositionFirstMatchInPalette(grid, cellColor));
  }

  return palette.merge({
    currentColor,
    grid
  });
};

const updatePalette = (palette, action) => {
  const { drawingTool } = action;
  if (drawingTool === EYEDROPPER) {
    return eyedropColor(palette, action);
  } else if ((drawingTool === PENCIL || drawingTool === BUCKET) && !isColorSelected(palette)) {
    return resetSelectedColorState(palette);
  }
  return palette;
};

const selectPaletteColor = (palette, action) => {
  const newColor = Map({
    color: getCellColor(action),
    position: action.position
  });
  return palette.set('currentColor', newColor);
};

const setCustomColor = (palette, { customColor }) => {
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
};

const setPalette = (palette, action) => palette.set('grid', fromJS(action.paletteGridData));

export default function paletteReducer(palette, action) {
  switch (action.type) {
    case types.SET_INITIAL_STATE:
    case types.NEW_PROJECT:
      return createPalette();
    case types.DRAW_CELL:
      return updatePalette(palette, action);
    case types.SELECT_PALETTE_COLOR:
      return selectPaletteColor(palette, action);
    case types.SET_CUSTOM_COLOR:
      return setCustomColor(palette, action);
    case types.SWITCH_TOOL:
      return disableColorWhenEraser(palette, action);
    case types.SET_DRAWING:
      return setPalette(palette, action);
    default:
      return palette;
  }
}
