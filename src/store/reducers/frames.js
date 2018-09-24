import { List, Map } from 'immutable';
import shortid from 'shortid';
import {
  create as createGrid,
  resize as resizeGrid
} from './pixelGrid';

function create(cellsCount, intervalPercentage) {
  return Map({
    grid: createGrid(cellsCount),
    interval: intervalPercentage,
    key: shortid.generate()
  });
}

function resetIntervals(frameList) {
  const equalPercentage = 100 / frameList.size;

  return frameList.map((frame, index) => {
    const percentage = index ===
      frameList.size - 1 ? 100 : Math.round(((index + 1) * equalPercentage) * 10) / 10;
    return Map({ grid: frame.get('grid'), interval: percentage, key: frame.get('key') });
  });
}

export function init(options) {
  const columns = parseInt(options.columns, 10) || 20;
  const rows = parseInt(options.rows, 10) || 20;
  const list = resetIntervals(List([create(columns * rows)]));
  return Map({
    list,
    columns,
    rows,
    activeIndex: 0
  });
}

export function reset(frames) {
  const activeIndex = frames.get('activeIndex');
  return frames.updateIn(['list', activeIndex], frame => create(
    frame.get('grid').size,
    frame.get('interval')
  ));
}

export function changeActive(frames, activeIndex) {
  return frames.merge({ activeIndex });
}

export function clone(frames, frameId) {
  const frameList = frames.get('list');
  const frame = frameList.get(frameId);
  const list = resetIntervals(frameList.splice(
    frameId,
    0,
    Map({
      grid: frame.get('grid'),
      interval: frame.get('interval'),
      key: shortid.generate()
    })
  ));
  return frames.merge({
    list, activeIndex: frameId + 1
  });
}

export function add(frames) {
  const frameList = frames.get('list');
  const list = resetIntervals(frameList.push(create(
    frameList.getIn([0, 'grid']).size,
    100
  )));
  return frames.merge({
    list,
    activeIndex: frameList.size
  });
}

export function remove(frames, frameId) {
  const frameList = frames.get('list');
  if (frameList.size <= 1) {
    return frames;
  }
  const activeIndex = frames.get('activeIndex');
  const reduceFrameIndex = (activeIndex >= frameId) && (activeIndex > 0);
  return frames.merge({
    list: resetIntervals(frameList.splice(frameId, 1)),
  }, reduceFrameIndex ? { activeIndex: frameList.size - 2 } : {});
}

export function changeDimensions(frames, gridProperty, increment) {
  const dimensions = {
    columns: frames.get('columns'),
    rows: frames.get('rows')
  };
  const list = frames.get('list').map(frame => Map({
    grid:
      resizeGrid(
        frame.get('grid'),
        gridProperty,
        increment,
        dimensions
      ),
    interval: frame.get('interval'),
    key: frame.get('key')
  }));
  return frames.merge({
    list,
    [gridProperty]: frames.get(gridProperty) + increment
  });
}
