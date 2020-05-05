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

const formatFrameOutput = (array, columns, options) => {
  const isEven = number => number % 2 === 0;
  const arrayByRow = arrayChunks(array, columns);
  const arrayRowsReversed = arrayByRow.map((row, index) => {
    if (
      (isEven(index + 1) && options.reverseEven) ||
      (!isEven(index + 1) && options.reverseOdd)
    ) {
      return row.reverse();
    }
    return row;
  });
  const arrayFormatted = arrayRowsReversed.flat();

  const lastPixelPos = arrayFormatted.length;
  return arrayFormatted.reduce((acc, pixel, index) => {
    const pixelFormatted = formatPixelColorOutput(pixel, options.colorFormat);
    return `${acc} ${pixelFormatted}${index + 1 === lastPixelPos ? '' : ','}${
      (index + 1) % columns ? '' : '\n'
    }`;
  }, '');
};

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
