import React from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../action_creators';

export const Frame = (props) => {
  const handleClick = () => {
    props.changeActiveFrame(props['data-id']);
  };

  let style = {
    border: '1px solid #313131',
    backgroundColor: '#BBBBBB',
    color: 'white'
  };

  return (
    <div
      className="frame"
      onClick={() => { handleClick(); }}
      style={style}
    >
      Frame {props['data-id']}
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
