import React from 'react';
import {connect} from 'react-redux';
import * as actionCreators from '../action_creators';

export const CssDisplay = React.createClass({
  generateCss: function() {
    const { grid, columns, rows, cellSize } = this.props;
    let cssString = grid.toJS().reduce((accumulator, currentValue, i) => {
      if (currentValue.used) {
        let xCoord = ((i % columns) * cellSize) + cellSize;
        let yCoord = (parseInt(i / rows, 10) * cellSize) + cellSize;

        return accumulator +
          ' ' +
          (xCoord + 'px ') +
          (yCoord + 'px')
          + ' 0 '
          + '#' + currentValue.color
          + ',';
      } else {
        return accumulator;
      }
    }, '');

    if (!!cssString) {
      cssString = cssString.slice(0, -1);
      cssString = 'box-shadow:' + cssString + '; '
      cssString +=  'height: ' + cellSize + 'px; width: ' + cellSize + 'px;';
    }
    return <div>{cssString}</div>;
  },
  render: function() {
    const style = {
      backgroundColor: '#CCCCCC'
    };
    return <div className="css-display" style={style}>
      {this.generateCss()}
    </div>;
  }
});

function mapStateToProps(state) {
  return {
    grid: state.get('grid'),
    columns: state.get('columns'),
    rows: state.get('rows'),
    cellSize: state.get('cellSize')
  };
}
export const CssDisplayContainer = connect(
  mapStateToProps,
  actionCreators
)(CssDisplay);
