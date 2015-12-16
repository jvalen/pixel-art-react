export function generatePixelDrawCss(pixelGrid, columns, rows, cellSize) {
  let cssString = pixelGrid.reduce((accumulator, currentValue, i) => {
    if (currentValue.used) {
      let xCoord = ((i % columns) * cellSize) + cellSize;
      let yCoord = (parseInt(i / rows, 10) * cellSize) + cellSize;

      return accumulator +
        ' ' +
        (xCoord + 'px ') +
        (yCoord + 'px')
        + ' 0 '
        + '#' + currentValue.color
        + ',';
    } else {
      return accumulator;
    }
  }, '');
  return cssString;
}
