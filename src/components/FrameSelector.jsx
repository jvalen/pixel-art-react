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
        />
      );
    });
  };

  let style = {
    width: '80%',
    display: 'inline-block'
  };

  return (
    <div className="frame-selector" style={style}>
      {getFrames()}
    </div>
  );
};
