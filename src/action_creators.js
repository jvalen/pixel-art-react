export function setState(state) {
  return {
    type: 'SET_STATE',
    state
  };
}

export function setGridDimension(columns, rows) {
  return {
    type: 'SET_GRID_DIMENSION',
    columns,
    rows
  };
}

export function setColorSelected(newColorSelected) {
  return {
    type: 'SET_COLOR_SELECTED',
    newColorSelected
  };
}

export function setGridCellValue(color, used, id) {
  return {
    type: 'SET_GRID_CELL_VALUE',
    color,
    used,
    id
  };
}
