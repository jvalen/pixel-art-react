import React from 'react';
import Preview from './Preview';
import { List } from 'immutable';

const Frame = (props) => {
  const handleClick = () => {
    props.actions.changeActiveFrame(props['data-id']);
  };

  const deleteFrame = (e) => {
    e.stopPropagation();
    if (props.active) {
      props.actions.deleteFrame(props['data-id']);
    }
  };

  const duplicateFrame = (e) => {
    e.stopPropagation();
    if (props.active) {
      props.actions.duplicateFrame(props['data-id']);
    }
  };

  return (
    <div
      className={`frame${props.active ? ' active' : ''}`}
      onClick={() => { handleClick(); }}
    >
      <Preview
        frames={List([props.frame])}
        columns={props.columns}
        rows={props.rows}
        cellSize={2}
        activeFrameIndex={0}
      />
      <div
        className="delete"
        onClick={deleteFrame}
      />
      <div
        className="duplicate"
        onClick={duplicateFrame}
      />
      <input
        type="text"
        value={props.frame.get('interval')}
        onChange={() => { console.log("change"); }}
        className="frame__percentage"
      />
    </div>
  );
};

export default Frame;
