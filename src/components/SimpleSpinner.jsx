import React from 'react';
import { connect } from 'react-redux';

const SimpleSpinner = ({ loading }) => (
  <div className={`simple-spinner${loading ? ' display' : ''}`}>
    <div className="circle" />
  </div>
);

const mapStateToProps = state => ({
  loading: state.present.get('loading')
});

const SimpleSpinnerContainer = connect(mapStateToProps)(SimpleSpinner);
export default SimpleSpinnerContainer;
