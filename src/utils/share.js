import 'whatwg-fetch';
import { generateAnimationIntervals } from 'box-shadow-pixels';
import { generatePixelDrawCss } from './cssParse';

const shareDrawing = (imageData, text, action, sendNotification) => {
  const duration = imageData.duration * 1000; // Milliseconds
  const framesCount = imageData.frames.size;
  let drawingData;

  switch (imageData.type) {
    case 'single': {
      // Just need single frame data
      drawingData = generatePixelDrawCss(
        imageData.activeFrame,
        imageData.columns,
        imageData.cellSize,
        'array'
      );
      break;
    }
    default: {
      // Multiple frame type
      drawingData = imageData.frames.reduce((acc, currentFrame) => {
        acc.push(
          generatePixelDrawCss(
            currentFrame,
            imageData.columns,
            imageData.cellSize,
            'array'
          )
        );
        return acc;
      }, []);
      break;
    }
  }

  const css = {
    cols: imageData.columns,
    rows: imageData.rows,
    pixelSize: imageData.cellSize,
    drawingData: JSON.stringify(drawingData),
    text,
    type: imageData.type,
    animationInfo: {
      duration,
      framesCount,
      intervals: generateAnimationIntervals(imageData.frames)
    }
  };

  switch (action) {
    case 'twitter':
      fetch('/auth/twitter', {
        credentials: 'same-origin',
        method: 'POST',
        // prettier-ignore
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(css)
      }).then(
        response => {
          if (response.status >= 200 && response.status < 300) {
            // Redirect to Twitter with the new token
            response.json().then(responseText => {
              window.location = responseText;
            });
          } else {
            sendNotification('Sorry: Error sharing');
          }
        },
        () => {
          // Handle network error
          sendNotification('Sorry: Error sharing');
        }
      );
      break;
    default:
  }
};

export default shareDrawing;
