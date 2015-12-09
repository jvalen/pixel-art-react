import React from 'react';
import {GridContainer} from './Pixel-grid';
import {DimensionsContainer} from './Dimensions';

export default React.createClass({
  render: function() {
    return <div className="pixelArtApp">
        <GridContainer />
        <DimensionsContainer />
      </div>;
  }
});
