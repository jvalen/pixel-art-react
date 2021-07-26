import React from 'react';
import styled from 'styled-components';
import breakpoints from '../../utils/breakpoints';
import Picker from '../Picker';
import { getCanvasDimensions } from '../../utils/loadFromCanvas';

const LoadSetup = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: start;
  margin: 0 0 1.5rem;
  background-color: whitesmoke;
  padding: 1rem 0;
`;

const PickerWrapper = styled.div`
  padding: 1rem;
  margin: 0 auto 1rem auto;
  width: 100%;
  @media only screen and (${breakpoints.device.lg}) {
    width: 50%;
  }
`;

const PickerTitle = styled.h2`
  display: block;
  text-align: center;
  margin: 0;
  font-size: 1rem;
  top: 0;
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

const getImageDimensions = (canvasDimensions, pSize, frameAmount) => {
  const pixelsWidth = Math.round((canvasDimensions.w / pSize) * 100) / 100;
  const pixelsHeight =
    Math.round((canvasDimensions.h / pSize / frameAmount) * 100) / 100;
  return {
    original: { w: canvasDimensions.w, h: canvasDimensions.h },
    result: { w: pixelsWidth, h: pixelsHeight }
  };
};

const ImageSetupSection = ({
  canvasRef,
  frameCount,
  setFrameCount,
  pixelSize,
  setPixelSize,
  setResultDimensions,
  imgSetupValidation
}) => {
  const getPickerAction = (property, setProperty) => (type, behaviour) => {
    const newPickerCount = property.value + behaviour;
    const pixelValue = property.id === 'frame' ? pixelSize : newPickerCount;
    const frameValue = property.id === 'frame' ? newPickerCount : frameCount;
    setProperty(newPickerCount);
    setResultDimensions(
      getImageDimensions(getCanvasDimensions(canvasRef), pixelValue, frameValue)
        .result
    );
    imgSetupValidation(getCanvasDimensions(canvasRef), pixelValue, frameValue);
  };

  const framePickerAction = getPickerAction(
    { value: frameCount, id: 'frame' },
    setFrameCount
  );
  const pixelSizePickerAction = getPickerAction(
    { value: pixelSize, id: 'pixel' },
    setPixelSize
  );

  return (
    <LoadSetup>
      <PickerWrapper>
        <PickerTitle>
          Number of Frames
          <span data-tooltip="The image will be divided vertically by this value">
            <PickerInfoIcon className="icon-help" />
          </span>
        </PickerTitle>
        <Picker
          type="frame-count"
          value={frameCount}
          action={framePickerAction}
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
          action={pixelSizePickerAction}
        />
      </PickerWrapper>
    </LoadSetup>
  );
};

export default ImageSetupSection;
