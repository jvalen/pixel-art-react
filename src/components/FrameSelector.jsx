import React from 'react';
import { FrameContainer } from './Frame';

export const FrameSelector = (props) => {
  const getFrames = () => {
    return props.frames.map((frameData, index) => {
      return (
        <FrameContainer key={index} data-id={index} frame={frameData} />
      );
    });
  };

  let style = {
    border: '2px solid #313131',
    backgroundColor: '#585858'
  };

  return (
    <div className="frame-selector" style={style}>
      {getFrames()}
    </div>
  );
};
