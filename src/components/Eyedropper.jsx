import React from 'react';
import {connect} from 'react-redux';
import * as actionCreators from '../action_creators';

export const Eyedropper = React.createClass({
  handleClick: function(event) {
    this.props.setEyedropper();
  },
  render: function() {
    let style = {};

    if (this.props.eyedropperOn) {
      style.color = '#BBBBBB';
      style.border = '2px solid #BBBBBB';
    }

    return (
      <div className="fa fa-eyedropper" onClick={this.handleClick} style={style}></div>
    );
  }
});

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
