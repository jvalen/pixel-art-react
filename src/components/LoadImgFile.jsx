import React, { useState, useRef, useEffect } from 'react';
import { fromJS } from 'immutable';
import shortid from 'shortid';
import styled, { css } from 'styled-components';
import getTimeInterval from '../utils/intervals';
import Picker from './Picker';
import Button from './Button';
import breakpoints from '../utils/breakpoints';

const Container = styled.div`
  text-align: center;
  padding: 1rem 0;
`;

const Title = styled.h2`
  display: block;
  text-align: center;
  margin-bottom: 2rem;
  font-size: 1rem;
  top: 0;
`;

const PickerWrapper = styled.div`
  background-color: whitesmoke;
  padding: 2rem;
  margin: 1rem;
`;

const PickerTitle = styled(Title)`
  display: block;
  text-align: center;
  font-size: 1rem;
  margin: 0;
  padding: 0 0 0.5rem 0;
`;

const PropertiesContainer = styled.div`
  display: none;
  font-size: 1.5rem;
  line-height: 2rem;
  padding: 2rem 0;

  ${props =>
    props.imageLoaded &&
    css`
      display: flex;
      flex-wrap: wrap;
      align-items: center;
    `}
`;

const LoadedImage = styled.div`
  width: 100%;
  padding: 0 1em;

  @media only screen and (${breakpoints.device.lg}) {
    width: 50%;
  }
`;

const CanvasWrapper = styled.div`
  margin: 0 auto;
  background-color: whitesmoke;
  overflow: scroll;
  min-width: 100px;
  min-height: 100px;
  max-width: 600px;
  max-height: 600px;
`;

const LoadSetup = styled.div`
  width: 100%;
  padding: 1rem 1em;
  @media only screen and (${breakpoints.device.lg}) {
    width: 50%;
  }
`;

const LoadImgFile = props => {
  const canvasRef = useRef(null);
  const [frameCount, setFrameCount] = useState(1);
  const [pixelSize, setPixelSize] = useState(1);
  const [validationError, setValidationError] = useState('');
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    context.fillStyle = '#CCCCCC';
    context.fillRect(0, 0, context.canvas.width, context.canvas.height);
  }, []);

  const onChange = ev => {
    const file = ev.target.files[0];
    if (canvasRef && file && file.type.match('image.*')) {
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
        setImageLoaded(true);
      };
      reader.readAsDataURL(file);
      reader.onload = function(evt) {
        if (evt.target.readyState === FileReader.DONE) {
          img.src = evt.target.result;
        }
      };
    }
    // TODO: Show error when file is not image type
  };

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

      console.log(heightInterval.top, heightInterval.bottom);

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

  const loadImgValidation = (context, size, frameAmount) => {
    const maxPixelsWidth = 100;
    const maxPixelsHeight = 100;

    const widthPixelsFit = context.width % size === 0;
    const heightPixelsFit = context.height % size === 0;

    const pixelsWidth = context.width / size;
    const pixelsHeight = context.height / size / frameAmount;

    setValidationError('');

    if (!widthPixelsFit || !heightPixelsFit) {
      setValidationError('No pixel size valid');
      return false;
    }

    if (pixelsWidth > maxPixelsWidth || pixelsHeight > maxPixelsHeight) {
      setValidationError(
        `Error: Max width pixels: ${maxPixelsWidth} VS ${pixelsWidth} - Max height pixels: ${maxPixelsHeight} VS ${pixelsHeight}`
      );
      return false;
    }

    return true;
  };

  const onClick = () => {
    const { actions } = props;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    if (
      loadImgValidation(
        {
          width: context.canvas.width,
          height: context.canvas.height
        },
        pixelSize,
        frameCount
      )
    ) {
      const CanvasByPixelSize = {
        width: context.canvas.width / pixelSize,
        height: context.canvas.height / pixelSize
      };
      const frames = generateFrames(context, frameCount, pixelSize);

      actions.setDrawing(
        frames,
        [],
        pixelSize,
        CanvasByPixelSize.width,
        Math.floor(CanvasByPixelSize.height / frameCount)
      );
    }
  };

  return (
    <Container>
      <Title>Create a project from an image file</Title>
      <Button type="file" onChange={onChange}>
        BROWSE...
      </Button>
      <p>{validationError}</p>
      <PropertiesContainer imageLoaded={imageLoaded}>
        <LoadedImage>
          <CanvasWrapper>
            <canvas
              className="block mx-auto"
              width="300"
              height="300"
              ref={canvasRef}
            />
          </CanvasWrapper>
        </LoadedImage>
        <LoadSetup>
          <PickerWrapper>
            <PickerTitle>Number of Frames</PickerTitle>
            <Picker
              type="frame-count"
              value={frameCount}
              action={(type, behaviour) => {
                setFrameCount(frameCount + behaviour);
              }}
            />
          </PickerWrapper>
          <PickerWrapper>
            <PickerTitle>Pixel Size</PickerTitle>
            <Picker
              type="pixel-size"
              value={pixelSize}
              action={(type, behaviour) => {
                setPixelSize(pixelSize + behaviour);
              }}
            />
          </PickerWrapper>
          <Button variant="action" onClick={onClick}>
            START
          </Button>
        </LoadSetup>
      </PropertiesContainer>
    </Container>
  );
};
export default LoadImgFile;
