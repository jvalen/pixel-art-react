import { fromJS } from 'immutable';
import shortid from 'shortid';
import getTimeInterval from './intervals';

const getHeightIntervals = (imageHeight, numberOfFrames) => {
  const heightPerFrame = Math.floor(imageHeight / numberOfFrames);
  const intervals = [];
  let top = 0;
  let bottom = heightPerFrame;
  for (let i = 0; i < numberOfFrames; i++) {
    intervals.push({
      top,
      bottom,
      timePercentage: getTimeInterval(i, numberOfFrames)
    });
    top += heightPerFrame;
    bottom += heightPerFrame;
  }
  return intervals;
};

const generateFrames = (imageContext, numberOfFrames, pixSize = 1) => {
  const { width, height } = imageContext.canvas;
  const heightIntervals = getHeightIntervals(height, numberOfFrames);
  const frameCollection = [];

  heightIntervals.forEach(heightInterval => {
    const pixelWidth = pixSize;
    const pixelHeight = pixSize;

    const grid = [];
    for (
      let y = heightInterval.top;
      y + pixelHeight <= heightInterval.bottom;
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

  return fromJS(frameCollection);
};

export const getCanvasDimensions = canvasRef => {
  if (canvasRef) {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    return { w: context.canvas.width, h: context.canvas.height };
  }
  return { w: 0, h: 0 };
};

export default generateFrames;
