import React from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../action_creators';

export class Eyedropper extends React.Component {
  handleClick() {
    this.props.setEyedropper();
  }
  render() {
    return (
      <div
        className={`eyedropper${this.props.eyedropperOn ? ' selected' : ''}`}
        onClick={() => { this.handleClick(); }}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    currentColor: state.present.get('currentColor'),
    eyedropperOn: state.present.get('eyedropperOn'),
  };
}
export const EyedropperContainer = connect(
  mapStateToProps,
  actionCreators
)(Eyedropper);
