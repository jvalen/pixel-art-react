import React from 'react';
import styled, { css } from 'styled-components';

const ImageDimensionDisplayContainer = styled.div`
  padding: 0.5rem 0;
  text-align: center;
  font-size: 1.2rem;
`;

const ImageDimensionDisplay = styled.span`
  ${props =>
    props.error &&
    css`
      color: red;
    `}
`;

const ImageSizeDisplay = ({ description, width, height }) => (
  <ImageDimensionDisplayContainer>
    {description}
    &nbsp;
    <ImageDimensionDisplay error={width.error}>
      {width.value}
    </ImageDimensionDisplay>
    &nbsp;x&nbsp;
    <ImageDimensionDisplay error={height.error}>
      {height.value}
    </ImageDimensionDisplay>
  </ImageDimensionDisplayContainer>
);

export default ImageSizeDisplay;
