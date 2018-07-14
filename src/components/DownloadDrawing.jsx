import React from 'react';
import shareDrawing from '../utils/share';
import renderCanvasGIF from '../utils/canvasGIF';

const DownloadDrawing = (props) => {
  const download = (type) => {
    const {
      frames, activeFrame, columns,
      rows, cellSize, duration
    } = props;

    shareDrawing(
      {
        type, frames, activeFrame, columns, rows, cellSize, duration
      },
      '',
      'download',
      props.actions.sendNotification
    );
  };

  const downloadGIF = (type) => {
    const {
      frames, activeFrame, columns,
      rows, cellSize, duration
    } = props;

    renderCanvasGIF(
      {
        type, frames, activeFrame, columns, rows, cellSize, duration
      },
      props.actions.sendNotification
    );
  };

  let showCanvasGIFDownload = false;
  switch (props.downloadType) {
    case 'animation':
      showCanvasGIFDownload = true;
      break;
    case 'single':
      showCanvasGIFDownload = true;
      break;
    default:
      showCanvasGIFDownload = false;
  }

  return (
    <div className="download-btn-group">
      <button
        className="download-btn download-drawing"
        onClick={() => { download(props.downloadType); }}
      >
        DOWNLOAD
      </button>
      {showCanvasGIFDownload ?
        <button
          className="download-btn download-gif"
          onClick={() => { downloadGIF(props.downloadType); }}
        >
          DOWNLOAD GIF
        </button>
        : null}
    </div>
  );
};

export default DownloadDrawing;
