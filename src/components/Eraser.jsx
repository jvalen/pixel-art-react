import React from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../store/actions/actionCreators';

export class Eraser extends React.Component {
  constructor(props) {
    super(props);
    this.state = { previousColor: null };
  }

  handleClick() {
    this.props.setEraser();
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

function mapStateToProps(state) {
  return {
    currentColor: state.present.get('currentColor'),
    eraserOn: state.present.get('eraserOn')
  };
}
export const EraserContainer = connect(
  mapStateToProps,
  actionCreators
)(Eraser);
