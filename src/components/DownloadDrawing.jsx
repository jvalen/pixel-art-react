import React from 'react';
import { connect } from 'react-redux';
import { shareDrawing } from '../utils/helpers';
import * as actionCreators from '../actions/actionCreators';

export class DownloadDrawing extends React.Component {
  download(type) {
    const {
      frames, activeFrame, columns,
      rows, cellSize, duration
    } = this.props;

    shareDrawing(
      { type, frames, activeFrame, columns, rows, cellSize, duration },
      '',
      'download'
    );
    this.props.sendNotification('Downloading...');
  }

  render() {
    return (
      <button
        className="download-drawing"
        onClick={() => { this.download(this.props.downloadType); }}
      >
        DOWNLOAD
      </button>
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
