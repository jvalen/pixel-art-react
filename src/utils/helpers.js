export function generatePixelDrawCss(pixelGrid, columns, rows, cellSize) {
  let cssString = pixelGrid.reduce((accumulator, currentValue, i) => {
    if (currentValue.used) {
      let xCoord = ((i % columns) * cellSize) + cellSize;
      let yCoord = (parseInt(i / columns, 10) * cellSize) + cellSize;

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
  return cssString.slice(0, -1);
}

export function shareDrawing(cssImageData, columns, rows, cellSize, text) {
  let cssParsedData = cssImageData.split(',').filter(
      function(elem){
        return elem !== ''
      }).map(
        function(elem){
          if (elem !== '') {
            return elem.trim().split(' ').reduce(
              function(acum, elem){
                acum.push(elem.split('px').shift());
                return acum;
              },
              [])
          }
        }
      );

  var css =  {
      'cols': columns,
      'rows': rows,
      'pixelSize': cellSize,
      'boxShadow': cssParsedData,
      'text': text
    };

  $.ajax({
    method: "POST",
    // url: "http://127.0.0.1:3000/auth/twitter",
    url: "/auth/twitter",
    data: css
  }).done(function(data) {
    window.location = data;
  });
}
