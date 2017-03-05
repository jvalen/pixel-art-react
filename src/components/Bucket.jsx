import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../store/actions/actionCreators';

const Bucket = (props) => {
  const handleClick = () => {
    props.actions.setBucket();
  };

  return (
    <button
      className={`bucket${props.bucketOn ? ' selected' : ''}`}
      onClick={() => { handleClick(); }}
    />
  );
};

const mapStateToProps = state => ({
  bucketOn: state.present.get('bucketOn')
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actionCreators, dispatch)
});

const BucketContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Bucket);
export default BucketContainer;
