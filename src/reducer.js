import {Map, toJS} from 'immutable';

function createGrid(cellsCount, initialColor, createGamma) {
  let newGrid = [];

  if (createGamma) {
    // Create colors gamma
    for(var i = 0; i <= cellsCount ; i += 32) {
      let hex = ((0xe000|i).toString(16)).slice(1);
      newGrid.push({color: hex});
    }
  } else {
    //Set every cell with the initial color
    for (var i = 0; i < cellsCount; i++) {
      newGrid.push({color: initialColor});
    }
  }

  return newGrid;
}

function setInitialState(state, newState) {
  //Create initial grid
  let cellSize = 10,
      columns = 10,
      rows = 10,
      padding = 0.1,
      currentColor = '2CF518',
      pixelGrid = createGrid(columns * rows, '000'),
      paletteGrid = createGrid(4095, '000', true);

  let initialState = {
    grid: pixelGrid,
    paletteGridData: paletteGrid,
    cellSize: cellSize,
    columns: columns,
    rows: rows,
    padding: padding,
    currentColor: currentColor
  };
  console.log(initialState);

  return state.merge(initialState);
}

function setGridDimension(state, columns, rows) {
  console.log('********* setGridDimension action launched');
  console.log(columns);
  console.log(rows);

  let newState = {
    grid: createGrid(columns * rows, '000'),
    rows: parseInt(rows, 10),
    columns: parseInt(columns, 10)
  }

  console.log(state.merge(newState).toJS());

  return state.merge(newState);
}

export default function(state = Map(), action) {
  switch (action.type) {
  case 'SET_INITIAL_STATE':
    return setInitialState(state, action.state);
  case 'SET_GRID_DIMENSION':
    return setGridDimension(state, action.columns, action.rows);
  }
  return state;
}
