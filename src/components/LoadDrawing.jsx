import React from 'react';
import {connect} from 'react-redux';
import * as actionCreators from '../action_creators';

export const LoadDrawing = React.createClass({
  load: function() {
    console.log("LoadDrawing");
  },
  render: function() {
    return <button className="load-drawing" onClick={this.load}>LOAD</button>;
  }
});

function mapStateToProps(state) {
  return {};
}
export const LoadDrawingContainer = connect(
  mapStateToProps
)(LoadDrawing);
