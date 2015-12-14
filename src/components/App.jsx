import React from 'react';
import {GridContainer} from './Pixel-grid';
import {DimensionsContainer} from './Dimensions';
import {PaletteContainer} from './Palette-grid';
import {CssDisplayContainer} from './Css-display';

export default React.createClass({
  render: function() {
    return <div id="pixel-art-app">
        <div className="grid">
          <div className="col-1-4">
            <PaletteContainer />
          </div>
          <div className="col-1-2">
            <GridContainer />
          </div>
          <div className="col-1-4">
            <DimensionsContainer />
          </div>
        </div>
        <div className="css-container">
          <CssDisplayContainer />
        </div>
      </div>;
  }
});
