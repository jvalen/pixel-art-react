import React from 'react';
import { connect } from 'react-redux';
import { generatePixelDrawCss, shareDrawing } from '../utils/helpers';
import * as actionCreators from '../action_creators';

export class DownloadDrawing extends React.Component {
  handleClick() {
    const { activeFrame, columns, rows, cellSize } = this.props;

    const cssString = generatePixelDrawCss(activeFrame, columns, rows, cellSize);
    shareDrawing(
      {
        css: cssString,
        columns,
        rows,
        cellSize,
      },
      '',
      'download'
    );
    this.props.sendNotification('Downloading...');
  }

  render() {
    let style = {
      margin: '0 auto',
      display: 'table'
    };
    return (
      <div style={style}>
        <button
          className="fa fa-download brown"
          onClick={() => { this.handleClick(); }}
        />
      </div>
    );
  }
}

function mapStateToProps() {
  return {};
}
export const DownloadDrawingContainer = connect(
  mapStateToProps,
  actionCreators
)(DownloadDrawing);
