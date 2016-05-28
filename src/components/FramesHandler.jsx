import React from 'react';
import { FrameList } from './FrameList';
import { AddFrameContainer } from './AddFrame';

export const FramesHandler = (props) => {
  return (
    <div className="frames-handler">
      <AddFrameContainer />
      <FrameList
        frames={props.frames}
        columns={props.columns}
        rows={props.rows}
        activeFrameIndex={props.activeFrameIndex}
      />
    </div>
  );
};

export default FramesHandler;
