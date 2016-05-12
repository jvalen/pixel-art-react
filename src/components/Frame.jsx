import React from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../action_creators';
import { PreviewContainer } from './Preview';

export const Frame = (props) => {
  const handleClick = () => {
    props.changeActiveFrame(props['data-id']);
  };

  let style = {
    border: '1px solid #313131',
    backgroundColor: '#BBBBBB',
    color: 'white',
    position: 'relative',
    display: 'inline-block',
    width: '10%',
    height: '3em',
    margin: '0 0.3em'
  };

  return (
    <div
      className="frame"
      onClick={() => { handleClick(); }}
      style={style}
    >
      <PreviewContainer
        frames={[props.frame]}
        columns={props.columns}
        rows={props.rows}
        cellSize={2}
        activeFrameIndex={0}
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
