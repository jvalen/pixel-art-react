import React from 'react';
import shareDrawing from '../utils/share';

const DownloadDrawing = (props) => {
  const download = (type) => {
    const {
      frames, activeFrame, columns,
      rows, cellSize, duration
    } = props;

    shareDrawing(
      { type, frames, activeFrame, columns, rows, cellSize, duration },
      '',
      'download',
      props.actions.sendNotification
    );
  };

  return (
    <button
      className="download-drawing"
      onClick={() => { download(props.downloadType); }}
    >
      DOWNLOAD
    </button>
  );
};

export default DownloadDrawing;
