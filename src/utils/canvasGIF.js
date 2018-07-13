import GIFEncoder from 'gif-encoder';
import blobStream from 'blob-stream';

function randomName() {
  return Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 8);
}

function renderFrameToCanvas(
  canvas, frame,
  width, height, cellWidth, cellHeight
) {
  const ctx = canvas.getContext('2d');
  ctx.canvas.width = width;
  ctx.canvas.height = height;

  const cols = Math.floor(width / cellWidth);
  frame.get('grid').forEach((fillStyle, idx) => {
    if (!fillStyle) {
      return;
    }
    ctx.fillStyle = fillStyle;

    const col = idx % cols;
    const row = Math.floor(idx / cols);
    ctx.fillRect(col * cellWidth, row * cellHeight, cellWidth, cellHeight);
  });

  return ctx.getImageData(0, 0, width, height).data;
}

function renderFrames(settings, sendNotification) {
  const {
    type,
    frames, duration,
    rows, columns, cellSize,
  } = settings;

  const durationInMillisecond = duration * 1000;
  const width = columns * cellSize;
  const height = rows * cellSize;

  const canvas = document.createElement('canvas');
  const gif = new GIFEncoder(width, height);
  gif.pipe(blobStream())
    .on('finish', function () {
      const blobURL = this.toBlobURL();
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = blobURL;
      a.setAttribute('download', `${randomName()}.gif`);
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setTimeout(() => {
        window.URL.revokeObjectURL(blobURL);
        sendNotification('downloading...');
      }, 100);
    });

  gif.setRepeat(0); // loop indefinitely
  gif.setDispose(3); // restore to previous
  gif.writeHeader();

  switch (type) {
    case 'single':
      gif.addFrame(renderFrameToCanvas(
        canvas, frames.get(0),
        width, height, cellSize, cellSize
      ));
      break;
    default:
      frames.forEach((frame, idx) => {
        gif.addFrame(renderFrameToCanvas(
          canvas, frame,
          width, height, cellSize, cellSize
        ));

        const nextFrame = frames.get(idx + 1);
        if (nextFrame) {
          const diff = nextFrame.get('interval') - frame.get('interval');
          const delay = diff * 0.01 * durationInMillisecond;
          gif.setDelay(delay);
        } else {
          gif.setDelay(0);
        }
      });
  }
  gif.finish();
}

export default renderFrames;
