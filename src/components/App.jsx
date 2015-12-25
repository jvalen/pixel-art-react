import React from 'react';
import {GridContainer} from './Pixel-grid';
import {DimensionsContainer} from './Dimensions';
import {PaletteContainer} from './Palette-grid';
import {CssDisplayContainer} from './Css-display';
import {PreviewContainer} from './Preview';
import {LoadDrawingContainer} from './LoadDrawing';
import {SaveDrawingContainer} from './SaveDrawing';
import {EraserContainer} from './Eraser';
import {ResetContainer} from './Reset';
import {EyedropperContainer} from './Eyedropper';

export default React.createClass({
  render: function() {
    return <div id="pixel-art-app">
        <div className="grid grid-pad">
          <div className="col-1-4">
            <PaletteContainer />
            <div className="grid">
              <div className="col-1-3">
                <EraserContainer />
              </div>
              <div className="fa fa-paint-brush col-1-3"></div>
              <div className="col-1-3">
                <EyedropperContainer />
              </div>
            </div>
          </div>
          <div className="col-1-2">
            <GridContainer />
          </div>
          <div className="col-1-4">
            <div className="load-save-container self_clear">
              <div className="load-button-wrapper">
                <LoadDrawingContainer />
              </div>
              <div className="save-button-wrapper">
                <SaveDrawingContainer />
              </div>
            </div>
            <ResetContainer />
            <DimensionsContainer />
          </div>
        </div>
        <div className="css-container">
          <CssDisplayContainer />
        </div>
      </div>;
  }
});
