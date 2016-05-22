import gm from 'gm';
import fs from 'fs';
const exec = require('child_process').exec;

/**
 * Remove files from a given path array
 */
function removeFiles(paths) {
  for (let i = 0; i < paths.length; i++) {
    fs.unlink(paths[i]);
  }
}

/**
 * Draw a single frame from CSS exported data
 */
function generateFrame(frameData, width, height, opacity, pixelSize) {
  const frame = frameData.map(
    (elem) => {
      return ({
        x: elem[0],
        y: elem[1],
        color: elem[3]
      });
    }
  );

  const BGCOLOR = '#000000';
  const FILLCOLOR = (
    `0${Math.round((1 - opacity) * 255).toString(16)}`
  ).slice(-2);

  const gmImg = gm(
    width, height,
    `${BGCOLOR}${FILLCOLOR}`
  );

  for (let i = 0; i < frame.length; i++) {
    const aux = frame[i];
    gmImg.fill(aux.color).drawRectangle(
      aux.x - pixelSize, aux.y - pixelSize, aux.x, aux.y
    );
  }

  return gmImg;
}

/**
 * Creates frame images
 */
function createFrameImages(cssData, width, height, opacity, splittedPath) {
  return cssData.drawingData.reduce((acc, frame, index) => {
    const gmImg = generateFrame(frame, width, height, opacity, cssData.pixelSize);

    const frameFilePath = `${splittedPath[0]}-${index}.${splittedPath[1]}`;
    const promise = new Promise((fulfill, reject) => {
      gmImg.write(
        frameFilePath,
        (err) => {
          if (err) {
            console.log(err);
            reject(`Rejected ${frameFilePath}`);
          } else {
            fulfill(`Fulfilled ${frameFilePath}`);
          }
        }
      );
    });

    acc.framePaths.push(frameFilePath);
    acc.promises.push(promise);

    return acc;
  }, { framePaths: [], promises: [] });
}

/**
 * Draw a single frame from CSS exported data
 */
export function drawFrame(data, path, callback) {
  const cssData = data;
  const width = cssData.cols * cssData.pixelSize;
  const height = cssData.rows * cssData.pixelSize;
  const opacity = 0;
  const gmImg = generateFrame(
    cssData.drawingData, width, height, opacity, cssData.pixelSize
  );

  gmImg.write(
    path,
    (err) => {
      if (err) {
        console.log(err);
      }
      callback();
    }
  );
}

/**
 * Creates a GIF from CSS exported data
 */
export function drawGif(data, path, transparent, callback) {
  const cssData = data;
  const width = cssData.cols * cssData.pixelSize;
  const height = cssData.rows * cssData.pixelSize;
  const opacity = 0;
  const splittedPath = path.split('.');

  const framesFilesData = createFrameImages(
    cssData, width, height, opacity, splittedPath
  );

  Promise.all(framesFilesData.promises).then(() => {
    const paths = framesFilesData.framePaths;
    const gifAnimatedPath = ` ${splittedPath[0]}-final.${splittedPath[1]}`;
    const gifFileName = gifAnimatedPath.split('images/tmp/')[1];

    const duration = cssData.animationInfo.duration;
    const equalDelay = cssData.animationInfo.equalIntervalDelay;
    const delayPerFrame = (equalDelay * 100) / duration;
    const opacityOptions = transparent ? ' ' : ' -background white -alpha remove';

    let creatingGifCommand = 'convert -dispose previous -loop 0';
    for (let i = 0; i < paths.length; i++) {
      creatingGifCommand += ` -delay ${delayPerFrame} ${paths[i]}`;
    }
    creatingGifCommand += `${opacityOptions}${gifAnimatedPath}`;

    exec(creatingGifCommand, (err) => {
      removeFiles(paths);
      if (err) {
        console.error(err);
        return;
      }
      callback(gifFileName);
      console.log('GIF created');
    });
  }, () => {
    removeFiles(framesFilesData.framePaths);
  });
}

/**
 * Creates a Spritesheet from CSS exported data
 */
export function drawSpritesheet(data, path, callback) {
  const cssData = data;
  const width = cssData.cols * cssData.pixelSize;
  const height = cssData.rows * cssData.pixelSize;
  const opacity = 0;
  const splittedPath = path.split('.');
  const framesFilesData = createFrameImages(
    cssData, width, height, opacity, splittedPath
  );

  Promise.all(framesFilesData.promises).then(() => {
    const paths = framesFilesData.framePaths;
    const spritesheetPath = `${splittedPath[0]}-final.${splittedPath[1]}`;
    const spritesheetFileName = spritesheetPath.split('images/tmp/')[1];

    const result = gm(paths[0]);
    for (let i = 1; i < paths.length; i++) {
      result.append(paths[i]);
    }
    result.write(spritesheetPath, (err) => {
      removeFiles(paths);
      if (err) {
        console.error(err);
        return;
      }
      callback(spritesheetFileName);
      console.log('spritesheet created');
    });
  }, () => {
    removeFiles(framesFilesData.framePaths);
  });
}
