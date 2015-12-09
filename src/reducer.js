import {Map, toJS} from 'immutable';

function setState(state, newState) {
  return state.merge(newState);
}

function setGridDimension(state, columns, rows) {
  console.log('********* setGridDimension action launched');
  console.log(columns);
  console.log(rows);

  let newGrid = [];
  for (var i = 0; i < columns; i++) {
    newGrid.push([]);
    for (var j = 0; j < rows; j++) {
      newGrid[i].push({color: 'black'});
    }
  }

  let newState = {
    grid: newGrid,
    rows: parseInt(rows, 10),
    columns: parseInt(columns, 10)
  }

  console.log(state.merge(newState).toJS());

  return state.merge(newState);
}

export default function(state = Map(), action) {
  switch (action.type) {
  case 'SET_STATE':
    return setState(state, action.state);
  case 'SET_GRID_DIMENSION':
    return setGridDimension(state, action.columns, action.rows);
  }
  return state;
}
