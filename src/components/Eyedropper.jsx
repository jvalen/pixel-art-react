import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../store/actions/actionCreators';

const Eyedropper = (props) => {
  const handleClick = () => {
    props.actions.setEyedropper();
  };

  return (
    <button
      className={`eyedropper${props.eyedropperOn ? ' selected' : ''}`}
      onClick={() => { handleClick(); }}
    />
  );
};

const mapStateToProps = state => ({
  eyedropperOn: state.present.get('eyedropperOn'),
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actionCreators, dispatch)
});

const EyedropperContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Eyedropper);
export default EyedropperContainer;
