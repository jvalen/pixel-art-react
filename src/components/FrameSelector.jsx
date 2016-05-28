import React from 'react';
import { FrameContainer } from './Frame';

export const FrameSelector = (props) => {
  const getFrames = () => {
    return props.frames.map((frameData, index) => {
      return (
        <FrameContainer
          key={index}
          data-id={index}
          frame={frameData}
          columns={props.columns}
          rows={props.rows}
          active={props.activeFrameIndex === index}
        />
      );
    });
  };

  return (
    <div className="frame-selector">
      {getFrames()}
    </div>
  );
};
