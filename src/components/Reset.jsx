import React from 'react';
import { connect } from 'react-redux';
import { resetGrid } from '../store/actions/actionCreators';

const Reset = props => (
  <button className="reset" onClick={props.resetGrid}>
    RESET
  </button>
);

const mapDispatchToProps = dispatch => ({
  resetGrid: () => dispatch(resetGrid())
});

const ResetContainer = connect(
  null,
  mapDispatchToProps
)(Reset);
export default ResetContainer;
