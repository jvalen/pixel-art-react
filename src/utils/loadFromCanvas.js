import { fromJS } from 'immutable';
import shortid from 'shortid';
import getTimeInterval from './intervals';

export const getDimensionIntervals = (dimension, numberOfFrames) => {
  const dimensionPerFrame = Math.floor(dimension / numberOfFrames);
  const intervals = [];
  let start = 0;
  let end = dimensionPerFrame;
  for (let i = 0; i < numberOfFrames; i++) {
    intervals.push({
      start,
      end,
      timePercentage: getTimeInterval(i, numberOfFrames)
    });
    start += dimensionPerFrame;
    end += dimensionPerFrame;
  }
  return intervals;
};

const generateFrames = (imageContext, numberOfFrames, pixSize = 1) => {
  const { width, height } = imageContext.canvas;
  const heightIntervals = getDimensionIntervals(height, numberOfFrames);
  const frameCollection = [];

  heightIntervals.forEach(heightInterval => {
    const pixelWidth = pixSize;
    const pixelHeight = pixSize;

    const grid = [];
    for (
      let y = heightInterval.start;
      y + pixelHeight <= heightInterval.end;
      y += pixelWidth
    ) {
      for (let x = 0; x + pixelWidth <= width; x += pixelWidth) {
        const currentPixel = imageContext.getImageData(
          x,
          y,
          pixelWidth,
          pixelHeight
        ).data;
        grid.push(
          `rgba(${currentPixel[0]},${currentPixel[1]},${currentPixel[2]},${currentPixel[3]})`
        );
      }
    }

    frameCollection.push({
      grid,
      interval: heightInterval.timePercentage,
      key: shortid.generate()
    });
  });

  console.log(frameCollection);

  return fromJS(frameCollection);
};

export const getCanvasDimensions = canvasRef => {
  if (canvasRef && canvasRef.current) {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    return { w: context.canvas.width, h: context.canvas.height };
  }
  return { w: 0, h: 0 };
};

export default generateFrames;
