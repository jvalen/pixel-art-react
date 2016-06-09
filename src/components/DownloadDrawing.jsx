import React from 'react';
import { shareDrawing } from '../utils/cssParse';

export default class DownloadDrawing extends React.Component {
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
    this.props.actions.sendNotification('Downloading...');
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
