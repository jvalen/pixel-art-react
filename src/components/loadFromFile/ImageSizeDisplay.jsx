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

const WarningSign = styled.span`
  margin-right: 0.5rem;
  width: 2rem;
  height: 2rem;
  padding: 3px 14px;
  display: inline-block;
  background-color: red;
  color: white;
`;

const ImageSizeDisplay = ({ description, width, height }) => (
  <ImageDimensionDisplayContainer>
    {(width.error || height.error) && <WarningSign>!</WarningSign>}
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
