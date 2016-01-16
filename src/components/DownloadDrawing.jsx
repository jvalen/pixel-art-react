import React from 'react';
import {connect} from 'react-redux';
import {generatePixelDrawCss, shareDrawing} from '../utils/helpers';
import * as actionCreators from '../action_creators';

export const DownloadDrawing = React.createClass({
  handleClick: function(event) {
    const { grid, columns, rows, cellSize } = this.props;

    let cssString = generatePixelDrawCss(grid, columns, rows, cellSize);
    shareDrawing(
      {
        css: cssString,
        columns: columns,
        rows: rows,
        cellSize: cellSize,
      },
      '',
      'download'
    );
    this.props.sendNotification('Downloading...');
  },
  render: function() {
    return(
      <div>
        <button className="fa fa-download brown" onClick={this.handleClick}></button>
      </div>
      );
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
export const DownloadDrawingContainer = connect(
  mapStateToProps,
  actionCreators
)(DownloadDrawing);
