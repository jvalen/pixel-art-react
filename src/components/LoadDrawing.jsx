import React from 'react';
import {connect} from 'react-redux';
import * as actionCreators from '../action_creators';

export const LoadDrawing = React.createClass({
  load: function() {
    console.log("LoadDrawing");
    let dataStored = localStorage.getItem('pixel-art-react'),
        test = JSON.parse(dataStored)[0];

    this.props.setDrawing(test.grid, test.cellSize, test.columns, test.rows);
  },
  render: function() {
    return <button className="load-drawing red" onClick={this.load}>LOAD</button>;
  }
});

function mapStateToProps(state) {
  return {};
}
export const LoadDrawingContainer = connect(
  mapStateToProps,
  actionCreators
)(LoadDrawing);
