import React from 'react';
import {GridContainer} from './Pixel-grid';
import {DimensionsContainer} from './Dimensions';
import {PaletteContainer} from './Palette-grid';

export default React.createClass({
  render: function() {
    return <div className="pixelArtApp">
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
      </div>;
  }
});
