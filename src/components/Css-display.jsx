import React from 'react';
import {connect} from 'react-redux';
import {generatePixelDrawCss} from '../utils/helpers';

export const CssDisplay = React.createClass({
  generateCss: function() {
    const { grid, columns, rows, cellSize } = this.props;
    let cssString = generatePixelDrawCss(grid.toJS(), columns, rows, cellSize);

    if (!!cssString) {
      cssString = cssString.slice(0, -1);
      cssString = 'box-shadow:' + cssString + '; '
      cssString +=  'height: ' + cellSize + 'px; width: ' + cellSize + 'px;';
    }

    return <div>{cssString}</div>;
  },
  render: function() {
    return <div className="css-display">
      {this.generateCss()}
    </div>;
  }
});

function mapStateToProps(state) {
  return {
    grid: state.present.get('grid'),
    columns: state.present.get('columns'),
    rows: state.present.get('rows'),
    cellSize: state.present.get('cellSize')
  };
}
export const CssDisplayContainer = connect(
  mapStateToProps
)(CssDisplay);
