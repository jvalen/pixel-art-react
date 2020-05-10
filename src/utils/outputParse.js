import formatPixelColorOutput from './color';

/*
 *  arrayChunks
 *  @param {array} An array
 *  @param {number} The number of elements we want in our chunk
 *  @return {array} An array of arrays chunks
 */
const arrayChunks = (array, chunkSize) =>
  Array(Math.ceil(array.length / chunkSize))
    .fill()
    .map((_, index) => index * chunkSize)
    .map(begin => array.slice(begin, begin + chunkSize));

/*
 *  formatFrameOutput
 *  @param {array} The frame, an array of color values
 *  @param {number} The columns count
 *  @param {object} It contains different options to format the output
 *  @return {string} The formatted output of the passed frame
 */
const formatFrameOutput = (frame, columns, options) => {
  const isEven = number => number % 2 === 0;
  const flattened = arr => [].concat(...arr);
  let frameRows = arrayChunks(frame, columns);
  frameRows = frameRows.map((row, index) => {
    if (
      (isEven(index + 1) && options.reverseEven) ||
      (!isEven(index + 1) && options.reverseOdd)
    ) {
      return row.reverse();
    }
    return row;
  });
  const frameFormatted = flattened(frameRows);

  const lastPixelPos = frameFormatted.length;
  return frameFormatted.reduce((acc, pixel, index) => {
    const pixelFormatted = formatPixelColorOutput(pixel, options.colorFormat);
    return `${acc} ${pixelFormatted}${index + 1 === lastPixelPos ? '' : ','}${
      (index + 1) % columns ? '' : '\n'
    }`;
  }, '');
};

/*
 *  generateFramesOutput
 *  @param {object} It contains all frames data, the columns count and different options to format the output
 *  @return {string} The formatted output of all the frames
 */
const generateFramesOutput = ({ frames, columns, options }) =>
  frames
    .toJS()
    .reduce(
      (acc, frame, index) =>
        `${acc}${index ? '\n' : ''}frame${index} = {\n${formatFrameOutput(
          frame.grid,
          columns,
          options
        )}};`,
      ''
    );

export default generateFramesOutput;
