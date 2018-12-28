import { List, Map, fromJS } from 'immutable';
import shortid from 'shortid';
import * as types from '../actions/actionTypes';
import { GRID_INITIAL_COLOR } from './activeFrameReducer';

const getPositionFirstMatchInPalette = (grid, color) =>
  grid.findIndex(gridColor => gridColor.get('color') === color);

const isColorInPalette = (grid, color) =>
  getPositionFirstMatchInPalette(grid, color) !== -1;

const disableColorWhenEraser = (palette, action) => {
  if (action.tool === 'ERASER') {
    return palette.set('position', -1);
  }
  return palette;
};

const addColorToLastGridCell = (palette, newColor) => {
  const grid = palette.get('grid');
  const lastPosition = grid.size - 1;
  return palette.merge({
    grid: grid.setIn([lastPosition, 'color'], newColor),
    position: lastPosition
  });
};

const createPaletteGrid = () =>
  List([
    '#000000',
    '#ff0000',
    '#e91e63',
    '#9c27b0',
    '#673ab7',
    '#3f51b5',
    '#2196f3',
    '#03a9f4',
    '#00bcd4',
    '#009688',
    '#4caf50',
    '#8bc34a',
    '#cddc39',
    '#9ee07a',
    '#ffeb3b',
    '#ffc107',
    '#ff9800',
    '#ffcdd2',
    '#ff5722',
    '#795548',
    '#9e9e9e',
    '#607d8b',
    '#303f46',
    '#ffffff',
    '#383535',
    '#383534',
    '#383533',
    '#383532',
    '#383531',
    '#383530'
  ]).map(color => Map({ color, id: shortid.generate() }));

const isColorSelected = palette => palette.get('position') !== -1;

const resetSelectedColorState = palette => palette.set('position', 0);

const createPalette = () =>
  Map({
    grid: createPaletteGrid(),
    position: 0
  });

const getCellColor = ({ color }) => color || GRID_INITIAL_COLOR;

const eyedropColor = (palette, action) => {
  const cellColor = getCellColor(action);
  const grid = palette.get('grid');

  if (!isColorInPalette(grid, cellColor)) {
    return addColorToLastGridCell(palette, cellColor);
  }
  return palette.set(
    'position',
    getPositionFirstMatchInPalette(grid, cellColor)
  );
};

const preparePalette = palette => {
  if (!isColorSelected(palette)) {
    return resetSelectedColorState(palette);
  }
  return palette;
};

const selectPaletteColor = (palette, action) =>
  palette.set('position', action.position);

const setCustomColor = (palette, { customColor }) => {
  if (!isColorSelected(palette)) {
    return addColorToLastGridCell(palette, customColor);
  }
  return palette.setIn(['grid', palette.get('position'), 'color'], customColor);
};

const setPalette = (palette, action) =>
  palette.set('grid', fromJS(action.paletteGridData));

export default function paletteReducer(palette = createPalette(), action) {
  switch (action.type) {
    case types.SET_INITIAL_STATE:
    case types.NEW_PROJECT:
      return createPalette();
    case types.APPLY_EYEDROPPER:
      return eyedropColor(palette, action);
    case types.APPLY_PENCIL:
    case types.APPLY_BUCKET:
      return preparePalette(palette);
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
