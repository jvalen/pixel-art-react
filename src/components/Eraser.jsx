import React from 'react';
import {connect} from 'react-redux';
import * as actionCreators from '../action_creators';

export const Eraser = React.createClass({
  getInitialState: function() {
    return {previousColor: null};
  },
  handleClick: function(event) {
    this.props.setEraser();
  },
  render: function() {
    let style = {
      border: '2px solid #313131',
      backgroundColor: '#585858'
    };

    if (this.props.eraserOn) {
      style.color = '#BBBBBB';
      style.border = '2px solid #BBBBBB';
    }

    return (
      <div className="fa fa-eraser" onClick={this.handleClick} style={style}></div>
    );
  }
});

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
