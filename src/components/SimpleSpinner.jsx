import React from 'react';
import { connect } from 'react-redux';

const SimpleSpinner = props =>
  <div className={`simple-spinner${props.loading ? ' display' : ''}`}>
    <div className="circle" />
  </div>
;

const mapStateToProps = state => ({
  loading: state.present.get('loading')
});

const SimpleSpinnerContainer = connect(
  mapStateToProps
)(SimpleSpinner);
export default SimpleSpinnerContainer;
