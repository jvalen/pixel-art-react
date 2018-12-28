import React from 'react';
import renderCanvasGIF from '../utils/canvasGIF';

const DownloadDrawing = props => {
  const download = type => {
    const { frames, activeFrame, columns, rows, cellSize, duration } = props;

    renderCanvasGIF(
      {
        type,
        frames,
        activeFrame,
        columns,
        rows,
        cellSize,
        duration
      },
      props.actions.sendNotification
    );
  };

  return (
    <button
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
