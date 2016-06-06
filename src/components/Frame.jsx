import React from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../actions/actionCreators';
import { PreviewContainer } from './Preview';
import { List } from 'immutable';

export const Frame = (props) => {
  const handleClick = () => {
    props.changeActiveFrame(props['data-id']);
  };

  const deleteFrame = (e) => {
    e.stopPropagation();
    if (props.active) {
      props.deleteFrame(props['data-id']);
    }
  };

  const duplicateFrame = (e) => {
    e.stopPropagation();
    if (props.active) {
      props.duplicateFrame(props['data-id']);
    }
  };

  return (
    <div
      className={`frame${props.active ? ' active' : ''}`}
      onClick={() => { handleClick(); }}
    >
      <PreviewContainer
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
    </div>
  );
};

function mapStateToProps() {
  return {};
}
export const FrameContainer = connect(
  mapStateToProps,
  actionCreators
)(Frame);
