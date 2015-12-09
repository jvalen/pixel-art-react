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
