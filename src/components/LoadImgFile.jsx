import React, { useState, useRef, useEffect } from 'react';
import styled, { css } from 'styled-components';
import Picker from './Picker';
import Button from './Button';
import ValidationMessage from './LoadProject/ValidationMessage';
import ImageSizeDisplay from './LoadProject/ImageSizeDisplay';
import breakpoints from '../utils/breakpoints';
import drawFileImageToCanvas from '../utils/ImageToCanvas';
import generateFrames, { getCanvasDimensions } from '../utils/loadFromCanvas';

const MAX_WIDTH = 100;
const MAX_HEIGHT = 100;

const Container = styled.div`
  text-align: center;
  padding: 1rem 0;
`;

const Title = styled.h2`
  display: block;
  text-align: center;
  margin-bottom: 2rem;
  font-size: 1.2em;
  top: 0;
`;

const PickerWrapper = styled.div`
  padding: 1rem;
  margin: 0 auto 1rem auto;
  width: 100%;
  padding: 0 1em;
  @media only screen and (${breakpoints.device.lg}) {
    width: 50%;
  }
`;

const PickerTitle = styled(Title)`
  display: block;
  text-align: center;
  font-size: 1rem;
  margin: 0;
  padding: 0 0 0.5rem 0;
`;

const PickerInfoIcon = styled.i`
  position: relative;
  background-color: #2f5382;
  color: white;
  border-radius: 9999px;
  top: -9px;
  padding: 0.2rem;
  margin-left: 0.4rem;
`;

const PropertiesContainer = styled.div`
  display: none;
  font-size: 1.5rem;
  line-height: 2rem;
  padding: 3rem 0 1rem;
  width: 100%;

  @media only screen and (${breakpoints.device.md}) {
    width: 50%;
    margin: 0 auto;
  }

  ${props =>
    props.imageLoaded &&
    css`
      display: block;
    `}
`;

const LoadedImage = styled.div`
  margin-bottom: 2rem;
`;

const ImageSizeSection = styled.div`
  background-color: whitesmoke;
  padding: 1rem 1rem;
`;

const CanvasWrapper = styled.div`
  margin: 0 auto 2rem;
  background-color: whitesmoke;
  overflow: scroll;
  width: 100%;
  min-height: 100px;
  max-height: 300px;
`;

const LoadSetup = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: start;
  margin: 0 0 1.5rem;
  background-color: whitesmoke;
  padding: 1rem 0;
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
    const widthPixelsFit = contextDimensions.w % size === 0;
    const heightPixelsFit = (contextDimensions.h / frameAmount) % size === 0;

    const pixelsWidth = contextDimensions.w / size;
    const pixelsHeight = contextDimensions.h / size / frameAmount;

    const maxWidthReached = pixelsWidth > MAX_WIDTH;
    const maxHeightReached = pixelsHeight > MAX_HEIGHT;

    if (!widthPixelsFit || !heightPixelsFit) {
      showValidationMessage({
        show: true,
        title: 'Error',
        message: 'No valid frame size. Width and height must be exact.',
        widthError: !widthPixelsFit,
        heightError: !heightPixelsFit
      });
      return false;
    }

    if (maxWidthReached || maxHeightReached) {
      showValidationMessage({
        show: true,
        title: 'Error - Dimension limit reached',
        message: `Frame size dimensions must no exceed ${MAX_WIDTH}px width by ${MAX_HEIGHT}px height. Please increase the pixel size or divide your image in different frames.`,
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
    const { actions, close } = props;
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
      close();
    }
  };

  const pickerAction = (property, setProperty) => (type, behaviour) => {
    const newPickerCount = property.value + behaviour;
    const pixelValue = property.id === 'frame' ? pixelSize : newPickerCount;
    const frameValue = property.id === 'frame' ? newPickerCount : frameCount;
    setProperty(newPickerCount);
    setResultDimensions(
      getImageDimensions(getCanvasDimensions(canvasRef), pixelValue, frameValue)
        .result
    );
    loadImgValidation(getCanvasDimensions(canvasRef), pixelValue, frameValue);
  };

  return (
    <Container>
      <Title>Find an image and create a project</Title>
      <Button type="file" onChange={onChange} ariaLabel="Load image file">
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
        </LoadedImage>
        <ImageSizeSection>
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
        </ImageSizeSection>
        <LoadSetup>
          <PickerWrapper>
            <PickerTitle>
              Number of Frames
              <span data-tooltip="The image will be evenly divided vertically by this value">
                <PickerInfoIcon className="icon-help" />
              </span>
            </PickerTitle>
            <Picker
              type="frame-count"
              value={frameCount}
              action={pickerAction(
                { value: frameCount, id: 'frame' },
                setFrameCount
              )}
            />
          </PickerWrapper>
          <PickerWrapper>
            <PickerTitle>
              Pixel Size
              <span data-tooltip="Tweak this value to get a pixel perfect frame size">
                <PickerInfoIcon className="icon-help" />
              </span>
            </PickerTitle>
            <Picker
              type="pixel-size"
              value={pixelSize}
              action={pickerAction(
                { value: pixelSize, id: 'pixel' },
                setPixelSize
              )}
            />
          </PickerWrapper>
        </LoadSetup>
        <Button
          variant={validationError.show ? 'action' : 'proceed'}
          onClick={onClick}
          size="full"
          ariaLabel="Create a project from the loaded image"
          disabled={validationError.widthError || validationError.heightError}
        >
          CREATE PROJECT
        </Button>
        {validationError.show && <ValidationMessage value={validationError} />}
      </PropertiesContainer>
    </Container>
  );
};
export default LoadImgFile;
