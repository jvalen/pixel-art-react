import React, { useState, useRef, useEffect } from 'react';
import styled, { css } from 'styled-components';
import Button from '../common/Button';
import ValidationMessage from './ValidationMessage';
import ImageDimensions from './ImageDimensions';
import ImageSetupSection from './ImageSetup';
import breakpoints from '../../utils/breakpoints';
import drawFileImageToCanvas from '../../utils/ImageToCanvas';
import generateFrames, {
  getCanvasDimensions
} from '../../utils/loadFromCanvas';

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

const LoadedImageContainer = styled.div`
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

const CanvasWrapper = styled.div`
  margin: 0 auto 2rem;
  background-color: whitesmoke;
  overflow: scroll;
  width: 100%;
  min-height: 100px;
  max-height: 300px;
`;

const LoadFromFile = props => {
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

  const imgSetupValidation = (contextDimensions, size, frameAmount) => {
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

  const onLoadImage = ev => {
    const file = ev.target.files[0];

    if (canvasRef) {
      const imageLoadedData = drawFileImageToCanvas(
        file,
        canvasRef.current,
        imgDimensions => {
          setImageLoaded(true);
          setImageDimensions(imgDimensions);
          setResultDimensions(imgDimensions);
          imgSetupValidation(
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

  const onCreateProject = () => {
    const { actions, close } = props;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    if (
      imgSetupValidation(
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

  return (
    <Container>
      <Title>Find an image and create a project</Title>
      <Button type="file" onChange={onLoadImage} ariaLabel="Load image file">
        BROWSE...
      </Button>
      <LoadedImageContainer imageLoaded={imageLoaded}>
        <CanvasWrapper>
          <canvas
            className="block mx-auto"
            width="300"
            height="300"
            ref={canvasRef}
          />
        </CanvasWrapper>

        <ImageDimensions
          imageDimensions={imageDimensions}
          resultDimensions={resultDimensions}
          validationError={validationError}
        />

        <ImageSetupSection
          canvasRef={canvasRef}
          frameCount={frameCount}
          setFrameCount={setFrameCount}
          pixelSize={pixelSize}
          setPixelSize={setPixelSize}
          setResultDimensions={setResultDimensions}
          imgSetupValidation={imgSetupValidation}
        />

        <Button
          variant={validationError.show ? 'action' : 'proceed'}
          onClick={onCreateProject}
          size="full"
          ariaLabel="Create a project from the loaded image"
          disabled={validationError.widthError || validationError.heightError}
        >
          CREATE PROJECT
        </Button>
        {validationError.show && <ValidationMessage value={validationError} />}
      </LoadedImageContainer>
    </Container>
  );
};
export default LoadFromFile;
