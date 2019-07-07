import React from 'react';
import { connect } from 'react-redux';
import { resetGrid } from '../store/actions/actionCreators';

const Reset = ({ resetGridDispatch }) => (
  <button type="button" className="reset" onClick={resetGridDispatch}>
    RESET
  </button>
);

const mapDispatchToProps = dispatch => ({
  resetGridDispatch: () => dispatch(resetGrid())
});

const ResetContainer = connect(
  null,
  mapDispatchToProps
)(Reset);
export default ResetContainer;
