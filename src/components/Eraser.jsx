import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../store/actions/actionCreators';

class Eraser extends React.Component {
  constructor(props) {
    super(props);
    this.state = { previousColor: null };
  }

  handleClick() {
    this.props.actions.setEraser();
  }

  render() {
    return (
      <div
        className={`eraser${this.props.eraserOn ? ' selected' : ''}`}
        onClick={() => { this.handleClick(); }}
      />
    );
  }
}

const mapStateToProps = (state) => ({
  eraserOn: state.present.get('eraserOn')
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actionCreators, dispatch)
});

const EraserContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Eraser);
export default EraserContainer;
