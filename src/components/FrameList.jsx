import React from 'react';
import { FrameContainer } from './Frame';
import { Scrollbars } from 'react-custom-scrollbars';

export const FrameList = (props) => {
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

  const style = {
    height: 80
  };

  return (
    <div className="frame-list">
      <Scrollbars
        universal
        style={style}
      >
        <div className="frame-list__container">
          {getFrames()}
        </div>
      </Scrollbars>
    </div>
  );
};
