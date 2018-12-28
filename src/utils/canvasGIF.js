import GIFEncoder from 'gif-encoder';
import blobStream from 'blob-stream';

function randomName() {
  return Math.random()
    .toString(36)
    .replace(/[^a-z]+/g, '')
    .substr(0, 8);
}

function fillCanvasWithFrame(canvas, frameInfo) {
  const { frame, cols, cellSize, frameHeight, frameIdx } = frameInfo;
  const ctx = canvas;
  frame.get('grid').forEach((fillStyle, pixelIdx) => {
    if (!fillStyle) {
      return;
    }
    ctx.fillStyle = fillStyle;

    const col = pixelIdx % cols;
    const row = Math.floor(pixelIdx / cols);
    ctx.fillRect(
      col * cellSize,
      row * cellSize + frameHeight * frameIdx,
      cellSize,
      cellSize
    );
  });
  return ctx;
}

function renderImageToCanvas(type, canvasInfo, currentFrameInfo, frames) {
  const { canvas, canvasHeight, canvasWidth } = canvasInfo;
  const { frame, frameHeight, frameWidth, cellSize } = currentFrameInfo;
  const cols = Math.floor(frameWidth / cellSize);
  let ctx = canvas.getContext('2d');
  ctx.canvas.width = canvasWidth;
  ctx.canvas.height = canvasHeight;
  switch (type) {
    case 'spritesheet':
      frames.forEach((currentFrame, frameIdx) => {
        ctx = fillCanvasWithFrame(ctx, {
          frame: currentFrame,
          cols,
          cellSize,
          frameHeight,
          frameIdx
        });
      });
      break;
    default:
      ctx = fillCanvasWithFrame(ctx, {
        frame,
        cols,
        cellSize,
        frameHeight,
        frameIdx: 0
      });
      break;
  }
  return ctx.getImageData(0, 0, canvasWidth, canvasHeight).data;
}

function renderFrames(settings, sendNotification) {
  const {
    type,
    frames,
    duration,
    activeFrame,
    rows,
    columns,
    cellSize
  } = settings;

  const durationInMillisecond = duration * 1000;
  const frameWidth = columns * cellSize;
  const frameHeight = rows * cellSize;
  const canvasWidth = frameWidth;
  const canvasHeight =
    type === 'spritesheet' ? frameHeight * frames.size : frameHeight;

  const canvas = document.createElement('canvas');
  const gif = new GIFEncoder(canvasWidth, canvasHeight);
  gif.pipe(blobStream()).on('finish', function() {
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
      sendNotification('Downloading...');
    }, 100);
  });

  gif.setRepeat(0); // loop indefinitely
  gif.setDispose(3); // restore to previous
  gif.writeHeader();

  switch (type) {
    case 'single':
    case 'spritesheet':
      gif.addFrame(
        renderImageToCanvas(
          type,
          {
            canvas,
            canvasHeight,
            canvasWidth
          },
          {
            frame: activeFrame,
            frameHeight,
            frameWidth,
            cellSize
          },
          frames
        )
      );
      break;
    default: {
      let previousInterval = 0;
      frames.forEach((frame, idx, framesArray) => {
        const isLastFrame = idx === framesArray.length - 1;
        const currentInterval = isLastFrame
          ? 100
          : frames.get(idx).get('interval');
        const diff = currentInterval - previousInterval;
        const delay = diff * 0.01 * durationInMillisecond;

        gif.setDelay(delay);
        previousInterval = currentInterval;

        gif.addFrame(
          renderImageToCanvas(
            type,
            {
              canvas,
              canvasHeight,
              canvasWidth
            },
            {
              frame,
              frameHeight,
              frameWidth,
              cellSize
            }
          )
        );
      });
    }
  }
  gif.finish();
}

export default renderFrames;
