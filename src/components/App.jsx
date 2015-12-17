import React from 'react';
import {GridContainer} from './Pixel-grid';
import {DimensionsContainer} from './Dimensions';
import {PaletteContainer} from './Palette-grid';
import {CssDisplayContainer} from './Css-display';
import {PreviewContainer} from './Preview';
import {LoadDrawingContainer} from './LoadDrawing';
import {SaveDrawingContainer} from './SaveDrawing';

export default React.createClass({
  render: function() {
    return <div id="pixel-art-app">
        <div className="grid grid-pad">
          <div className="col-1-4">
            <PaletteContainer />
            <div className="self_clear">
              <div className="load-button-wrapper">
                <LoadDrawingContainer />
              </div>
              <div className="save-button-wrapper">
                <SaveDrawingContainer />
              </div>
            </div>
          </div>
          <div className="col-1-2">
            <GridContainer />
          </div>
          <div className="col-1-4">
            <DimensionsContainer />
            <PreviewContainer key="0" />
          </div>
        </div>
        <div className="css-container">
          <CssDisplayContainer />
        </div>
      </div>;
  }
});
