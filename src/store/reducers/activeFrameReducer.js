import * as types from '../actions/actionTypes';

export const GRID_INITIAL_COLOR = '#313131';

const updateFrameProp = prop => propReducer => (frames, action) => {
  const activeIndex = frames.get('activeIndex');
  return frames.updateIn(['list', activeIndex, prop], stateProp =>
    propReducer(stateProp, action)
  );
};

const updateGrid = updateFrameProp('grid');
const updateInterval = updateFrameProp('interval');

const isSameColor = (colorA, colorB) =>
  (colorA || GRID_INITIAL_COLOR) === (colorB || GRID_INITIAL_COLOR);

const getSameColorAdjacentCells = (frameGrid, columns, rows, id, color) => {
  const adjacentCollection = [];
  let auxId;

  if ((id + 1) % columns !== 0) {
    // Not at the very right
    auxId = id + 1;
    if (isSameColor(frameGrid.get(auxId), color)) {
      adjacentCollection.push(auxId);
    }
  }
  if (id % columns !== 0) {
    // Not at the very left
    auxId = id - 1;
    if (isSameColor(frameGrid.get(auxId), color)) {
      adjacentCollection.push(auxId);
    }
  }
  if (id >= columns) {
    // Not at the very top
    auxId = id - columns;
    if (isSameColor(frameGrid.get(auxId), color)) {
      adjacentCollection.push(auxId);
    }
  }
  if (id < columns * rows - columns) {
    // Not at the very bottom
    auxId = id + columns;
    if (isSameColor(frameGrid.get(auxId), color)) {
      adjacentCollection.push(auxId);
    }
  }

  return adjacentCollection;
};

const drawPixel = (pixelGrid, color, id) => pixelGrid.set(id, color);

const applyBucketToGrid = (grid, { id, paletteColor, columns, rows }) => {
  const queue = [id];
  const cellColor = grid.get(id);
  let currentId;
  let newGrid = grid;
  let adjacents;
  let auxAdjacentId;
  let auxAdjacentColor;

  while (queue.length > 0) {
    currentId = queue.shift();
    newGrid = drawPixel(newGrid, paletteColor, currentId);
    adjacents = getSameColorAdjacentCells(
      newGrid,
      columns,
      rows,
      currentId,
      cellColor
    );

    for (let i = 0; i < adjacents.length; i++) {
      auxAdjacentId = adjacents[i];
      auxAdjacentColor = newGrid.get(auxAdjacentId);
      // Avoid introduce repeated or painted already cell into the queue
      if (
        queue.indexOf(auxAdjacentId) === -1 &&
        auxAdjacentColor !== paletteColor
      ) {
        queue.push(auxAdjacentId);
      }
    }
  }

  return newGrid;
};

const applyPencilToGrid = (pixelGrid, { paletteColor, id }) =>
  drawPixel(pixelGrid, paletteColor, id);

const applyBucket = updateGrid(applyBucketToGrid);

const applyPencil = updateGrid(applyPencilToGrid);

const applyEraser = updateGrid((pixelGrid, { id }) =>
  drawPixel(pixelGrid, '', id)
);

const resetGrid = updateGrid(pixelGrid => pixelGrid.map(() => ''));

const changeFrameInterval = updateInterval(
  (previousInterval, { interval }) => interval
);

export default function(frames, action) {
  switch (action.type) {
    case types.APPLY_PENCIL:
      return applyPencil(frames, action);
    case types.APPLY_ERASER:
      return applyEraser(frames, action);
    case types.APPLY_BUCKET:
      return applyBucket(frames, action);
    case types.SET_RESET_GRID:
      return resetGrid(frames);
    case types.CHANGE_FRAME_INTERVAL:
      return changeFrameInterval(frames, action);
    default:
      return frames;
  }
}
