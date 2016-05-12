import React from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../action_creators';

const AddFrame = (props) => {
  // TODO: Limit max frames (receive frames count)

  const handleClick = () => {
    props.createNewFrame();
  };

  return (
    <button
      className="add-frame gray"
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
