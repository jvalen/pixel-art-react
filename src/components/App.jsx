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
import {ColorPickerContainer} from './ColorPicker';
import {TwitterButtonContainer} from './TwitterButton';

export default React.createClass({
  render: function() {
    return <div id="pixel-art-app">
        <div className="grid grid-pad">
          <div className="col-3-4">
            <TwitterButtonContainer maxChars="140" />
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
          </div>
        </div>
        <div className="grid grid-pad">
          <div className="col-1-4">
            <PaletteContainer />
            <div className="grid color-tools-wrapper">
              <div className="col-1-3">
                <EraserContainer />
              </div>
              <div className="col-1-3">
                <ColorPickerContainer />
              </div>
              <div className="col-1-3">
                <EyedropperContainer />
              </div>
            </div>
          </div>
          <div className="col-1-2">
            <GridContainer />
          </div>
          <div className="col-1-4">
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
