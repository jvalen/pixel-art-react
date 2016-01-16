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

export function shareDrawing(imageData, text, type) {
  let cssParsedData = imageData.css.split(',').filter(
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
      'cols': imageData.columns,
      'rows': imageData.rows,
      'pixelSize': imageData.cellSize,
      'boxShadow': JSON.stringify(cssParsedData),
      'text': text
    };

  switch (type) {
    case 'download':
      $.ajax({
        method: "POST",
        url: "/auth/download",
        data: css
      }).done(function(data) {
        window.open(data);
      });
      console.log("download");
      break;
    case 'twitter':
      $.ajax({
        method: "POST",
        url: "/auth/twitter",
        data: css
      }).done(function(data) {
        window.location = data;
      });
      break;
  }
}
