import React from 'react';
import ReactDOM from 'react-dom';
import PixelArt from './lib-index';

ReactDOM.render(
  <PixelArt
    mintFn={grid => {
      console.log('Trying to mint.');
      console.log(grid);

      return new Promise(resolve => {
        resolve(true);
      });
    }}
    frameConfig={{ columns: 24, rows: 30 }}
  />,
  document.getElementById('app')
);
