import React from 'react';
import {GridContainer} from './Pixel-grid';
import {DimensionsContainer} from './Dimensions';
import {UndoRedoContainer} from './UndoRedo';
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
import {CopyCSSContainer} from './CopyCSS';

export default React.createClass({
  render: function() {
    return <div id="pixel-art-app">
        <div className="grid grid-pad main-block">
          <div className="col-1-4 grid">
            <div className="load-save-container self_clear">
              <div className="load-button-wrapper">
                <LoadDrawingContainer />
              </div>
              <div className="save-button-wrapper">
                <SaveDrawingContainer />
              </div>
            </div>
            <div className="col-3-4">
              <PaletteContainer />
            </div>
            <div className="col-1-4 tools-wrapper">
                <EraserContainer />
                <ColorPickerContainer />
                <EyedropperContainer />
            </div>
            <TwitterButtonContainer maxChars="140" />
          </div>
          <div className="col-1-2">
            <GridContainer />
          </div>
          <div className="col-1-4">
            <UndoRedoContainer />
            <DimensionsContainer />
            <ResetContainer />
            <CopyCSSContainer />
          </div>
        </div>
        <div className="css-container">
          <CssDisplayContainer />
        </div>
      </div>;
  }
});
