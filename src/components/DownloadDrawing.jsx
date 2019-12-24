import React from 'react';
import renderCanvasGIF from '../utils/canvasGIF';

const DownloadDrawing = props => {
  const DOWNLOAD_MESSAGE = 'Downloading...';
  const download = type => {
    const { frames, activeFrame, columns, rows, cellSize, duration } = props;
    props.actions.sendNotification(DOWNLOAD_MESSAGE);
    renderCanvasGIF({
      type,
      frames,
      activeFrame,
      columns,
      rows,
      cellSize,
      duration
    });
  };

  return (
    <button
      type="button"
      className="download-btn"
      onClick={() => {
        download(props.downloadType);
      }}
    >
      DOWNLOAD
    </button>
  );
};

export default DownloadDrawing;
