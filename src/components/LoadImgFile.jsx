import React, { useState, useRef, useEffect } from 'react';
import styled, { css } from 'styled-components';
import Picker from './Picker';
import Button from './Button';
import ValidationMessage from './LoadProject/ValidationMessage';
import ImageSizeDisplay from './LoadProject/ImageSizeDisplay';
import breakpoints from '../utils/breakpoints';
import drawFileImageToCanvas from '../utils/ImageToCanvas';
import generateFrames, { getCanvasDimensions } from '../utils/loadFromCanvas';

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
  padding: 1rem;
  margin: 0 auto 1rem auto;
  max-width: 300px;
`;

const PickerTitle = styled(Title)`
  display: block;
  text-align: center;
  font-size: 1rem;
  margin: 0;
  padding: 0 0 0.5rem 0;
`;

const PickerInfo = styled(Title)`
  display: block;
  text-align: center;
  font-size: 0.8rem;
  color: white;
  background-color: #585858;
  margin: 1rem 1rem 0;
  padding: 0.5rem 0.1rem;
  line-height: 1.2rem;
`;

const PropertiesContainer = styled.div`
  display: none;
  font-size: 1.5rem;
  line-height: 2rem;
  padding: 3rem 0 1rem;
  width: 100%;

  @media only screen and (${breakpoints.device.md}) {
    width: 70%;
    margin: 0 auto;
  }

  ${props =>
    props.imageLoaded &&
    css`
      display: flex;
      flex-wrap: wrap;
      align-items: start;
    `}
`;

const LoadedImage = styled.div`
  width: 100%;
  padding: 0 1em;
  margin-bottom: 2rem;

  @media only screen and (${breakpoints.device.lg}) {
    width: 50%;
  }
`;

const CanvasWrapper = styled.div`
  margin: 0 auto 2rem;
  background-color: whitesmoke;
  overflow: scroll;
  min-width: 100px;
  min-height: 100px;
  max-width: 500px;
  max-height: 300px;
`;

const LoadSetup = styled.div`
  width: 100%;
  padding: 0 1em;
  @media only screen and (${breakpoints.device.lg}) {
    width: 50%;
  }
`;

const LoadImgFile = props => {
  const canvasRef = useRef(null);
  const [frameCount, setFrameCount] = useState(1);
  const [pixelSize, setPixelSize] = useState(1);
  const [imageDimensions, setImageDimensions] = useState({ w: 0, h: 0 });
  const [resultDimensions, setResultDimensions] = useState({ w: 0, h: 0 });
  const [validationError, setValidationError] = useState({
    show: false,
    title: '',
    message: '',
    widthError: false,
    heightError: false
  });
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    context.fillStyle = '#CCCCCC';
    context.fillRect(0, 0, context.canvas.width, context.canvas.height);
  }, []);

  const showValidationMessage = validation => {
    setValidationError({
      show: false,
      title: '',
      message: '',
      widthError: false,
      heightError: false
    });
    if (validation.show) {
      setValidationError({
        show: true,
        title: validation.title,
        message: validation.message,
        widthError: validation.widthError,
        heightError: validation.heightError
      });
    }
  };

  const loadImgValidation = (contextDimensions, size, frameAmount) => {
    const maxPixelsWidth = 100;
    const maxPixelsHeight = 100;

    const widthPixelsFit = contextDimensions.w % size === 0;
    const heightPixelsFit = contextDimensions.h % size === 0;

    const pixelsWidth = contextDimensions.w / size;
    const pixelsHeight = contextDimensions.h / size / frameAmount;

    const maxWidthReached = pixelsWidth > maxPixelsWidth;
    const maxHeightReached = pixelsHeight > maxPixelsHeight;

    if (!widthPixelsFit || !heightPixelsFit) {
      showValidationMessage({
        show: true,
        title: 'Error',
        message: 'No valid pixel size. Width and height must be exact.',
        widthError: !widthPixelsFit,
        heightError: !heightPixelsFit
      });
      return false;
    }

    if (maxWidthReached || maxHeightReached) {
      showValidationMessage({
        show: true,
        title: 'Error - Dimension limit reached',
        message: `Frame size dimensions must no exceed ${maxPixelsWidth}px width by ${maxPixelsHeight}px height. Please increase the pixel size or divide your image in different frames.`,
        widthError: maxWidthReached,
        heightError: maxHeightReached
      });
      return false;
    }

    showValidationMessage({
      show: false,
      widthError: false,
      heightError: false
    });
    return true;
  };

  const onChange = ev => {
    const file = ev.target.files[0];

    if (canvasRef) {
      const imageLoadedData = drawFileImageToCanvas(
        file,
        canvasRef.current,
        imgDimensions => {
          setImageLoaded(true);
          setImageDimensions(imgDimensions);
          setResultDimensions(imgDimensions);
          loadImgValidation(
            getCanvasDimensions(canvasRef),
            pixelSize,
            frameCount
          );
        }
      );
      if (imageLoadedData.errorType) {
        setImageLoaded(false);
        showValidationMessage({
          show: true,
          title: 'Error',
          message:
            imageLoadedData.errorType === 'notImage'
              ? 'Not a valid image file.'
              : 'There was an error while loading the file.',
          widthError: false,
          heightError: false
        });
      } else {
        showValidationMessage({ show: false });
      }
    }
  };

  const getImageDimensions = (canvasDimensions, pSize, frameAmount) => {
    const pixelsWidth = Math.round((canvasDimensions.w / pSize) * 100) / 100;
    const pixelsHeight =
      Math.round((canvasDimensions.h / pSize / frameAmount) * 100) / 100;
    return {
      original: { w: canvasDimensions.w, h: canvasDimensions.h },
      result: { w: pixelsWidth, h: pixelsHeight }
    };
  };

  const onClick = () => {
    const { actions } = props;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    if (
      loadImgValidation(
        {
          w: context.canvas.width,
          h: context.canvas.height
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
          <ImageSizeDisplay
            description="Original:"
            width={{ value: imageDimensions.w }}
            height={{ value: imageDimensions.h }}
          />
          <ImageSizeDisplay
            description="Frame size:"
            width={{
              value: resultDimensions.w,
              error: validationError.widthError
            }}
            height={{
              value: resultDimensions.h,
              error: validationError.heightError
            }}
          />
        </LoadedImage>
        <LoadSetup>
          <PickerWrapper>
            <PickerTitle>Number of Frames</PickerTitle>
            <Picker
              type="frame-count"
              value={frameCount}
              action={(type, behaviour) => {
                const newPickerCount = frameCount + behaviour;
                setFrameCount(newPickerCount);
                setResultDimensions(
                  getImageDimensions(
                    getCanvasDimensions(canvasRef),
                    pixelSize,
                    newPickerCount
                  ).result
                );
                loadImgValidation(
                  getCanvasDimensions(canvasRef),
                  pixelSize,
                  newPickerCount
                );
              }}
            />
            <PickerInfo>
              The image will be evenly divided vertically by this value
            </PickerInfo>
          </PickerWrapper>
          <PickerWrapper>
            <PickerTitle>Pixel Size</PickerTitle>
            <Picker
              type="pixel-size"
              value={pixelSize}
              action={(type, behaviour) => {
                const newPickerCount = pixelSize + behaviour;
                setPixelSize(newPickerCount);
                setResultDimensions(
                  getImageDimensions(
                    getCanvasDimensions(canvasRef),
                    newPickerCount,
                    frameCount
                  ).result
                );
                loadImgValidation(
                  getCanvasDimensions(canvasRef),
                  newPickerCount,
                  frameCount
                );
              }}
            />
            <PickerInfo>
              Tweak this value to adjust your image to a pixel perfect image
            </PickerInfo>
          </PickerWrapper>
        </LoadSetup>
        {validationError.show && <ValidationMessage value={validationError} />}
        <Button
          variant={validationError.show ? 'action' : 'proceed'}
          onClick={onClick}
          size="full"
          disabled={validationError.widthError || validationError.heightError}
        >
          CREATE PROJECT
        </Button>
      </PropertiesContainer>
    </Container>
  );
};
export default LoadImgFile;
