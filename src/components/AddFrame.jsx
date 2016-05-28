import React from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../action_creators';

const AddFrame = (props) => {
  const handleClick = () => {
    props.createNewFrame();
  };

  return (
    <button
      className="add-frame"
      onClick={() => { handleClick(); }}
    >
      +
    </button>
  );
};

function mapStateToProps() {
  return {};
}
export const AddFrameContainer = connect(
  mapStateToProps,
  actionCreators
)(AddFrame);
