import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../store/actions/actionCreators';

const Eraser = (props) => {
  const handleClick = () => {
    props.actions.setEraser();
  };

  return (
    <button
      className={`eraser${props.eraserOn ? ' selected' : ''}`}
      onClick={() => { handleClick(); }}
    />
  );
};

const mapStateToProps = state => ({
  eraserOn: state.present.get('eraserOn')
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actionCreators, dispatch)
});

const EraserContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Eraser);
export default EraserContainer;
