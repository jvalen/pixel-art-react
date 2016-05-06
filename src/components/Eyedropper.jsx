import React from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../action_creators';

export class Eyedropper extends React.Component {
  handleClick() {
    this.props.setEyedropper();
  }

  render() {
    let style = {
      border: '2px solid #313131',
      backgroundColor: '#585858'
    };

    if (this.props.eyedropperOn) {
      style.color = '#BBBBBB';
      style.border = '2px solid #BBBBBB';
    }

    return (
      <div
        className="fa fa-eyedropper"
        onClick={() => { this.handleClick(); }}
        style={style}
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
