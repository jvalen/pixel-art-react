import React, { useRef, useEffect } from 'react';
import { fromJS } from 'immutable';
import shortid from 'shortid';
import getTimeInterval from '../utils/intervals';

const LoadImgFile = props => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    context.fillStyle = '#CCCCCC';
    context.fillRect(0, 0, context.canvas.width, context.canvas.height);
  }, []);

  const onChange = ev => {
    const file = ev.target.files[0];
    if (canvasRef && file.type.match('image.*')) {
      const reader = new FileReader();
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.style.display = 'none';
      img.onload = function() {
        context.canvas.width = img.width;
        context.canvas.height = img.height;
        context.drawImage(img, 0, 0);
      };
      reader.readAsDataURL(file);
      reader.onload = function(evt) {
        if (evt.target.readyState === FileReader.DONE) {
          img.src = evt.target.result;
        }
      };
    }
  };

  const getHeightIntervals = (imageHeight, frameCount) => {
    const heightPerFrame = Math.floor(imageHeight / frameCount);
    const intervals = [];
    let top = 0;
    let bottom = heightPerFrame;
    for (let i = 0; i < frameCount; i++) {
      intervals.push({
        top,
        bottom,
        timePercentage: getTimeInterval(i, frameCount)
      });
      top += heightPerFrame;
      bottom = heightPerFrame;
    }
    return intervals;
  };

  const generateFrames = (imageContext, frameCount = 1) => {
    const { width, height } = imageContext.canvas;
    const heightIntervals = getHeightIntervals(height, frameCount);

    const frameCollection = [];

    heightIntervals.forEach(heightInterval => {
      const currentImage = imageContext.getImageData(
        0,
        heightInterval.top,
        width,
        heightInterval.bottom
      ).data;
      frameCollection.push({
        grid: currentImage.reduce((acc, rgbaProperty, index) => {
          const colorPosition = acc.length ? acc.length - 1 : 0;
          let colorValue = acc.length ? acc[colorPosition] : '';

          if (index === 0 || index % 4 === 0) {
            colorValue = `rgba(${rgbaProperty},`;
            acc.push(colorValue);
          } else {
            colorValue += `${rgbaProperty}${index % 4 === 3 ? ')' : ','}`;
            acc[colorPosition] = colorValue;
          }
          return acc;
        }, []),
        interval: heightInterval.timePercentage,
        key: shortid.generate()
      });
    });

    return fromJS(frameCollection);
  };

  const onClick = () => {
    const { actions } = props;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    const defaultPixelSize = 5;
    const frameCount = 1;

    const frames = generateFrames(context, frameCount);

    actions.setDrawing(
      frames,
      [],
      defaultPixelSize,
      context.canvas.width,
      Math.floor(context.canvas.height / frameCount)
    );
  };

  return (
    <>
      <input type="file" onChange={onChange} />
      <button type="button" onClick={onClick}>
        Load from file
      </button>
      <canvas width="300" height="300" ref={canvasRef} />
    </>
  );
};
export default LoadImgFile;
