import React from 'react';
import styled from 'styled-components';
import ImageSizeDisplay from './ImageSizeDisplay';

const ImageSizeSection = styled.div`
  background-color: whitesmoke;
  padding: 1rem 1rem;
`;

const ImageDimensions = ({
  imageDimensions,
  resultDimensions,
  validationError
}) => (
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
);

export default ImageDimensions;
