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
import Loader from 'react-loader';
import {connect} from 'react-redux';

export const App = React.createClass({
  getInitialState: function () {
    return { loaded: false };
  },
  onSuccess: function (profile) {
    this.setState({ profile: profile, loaded: true });
  },
  render: function() {
    return <div id="pixel-art-app">
      <Loader loaded={!this.props.loading}>
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
            <div className="grid">
              <div className="col-3-4">
                <PaletteContainer />
              </div>
              <div className="col-1-4 tools-wrapper">
                  <EraserContainer />
                  <ColorPickerContainer />
                  <EyedropperContainer />
              </div>
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
        </Loader>
      </div>;
  }
});

function mapStateToProps(state) {
  return {
    loading: state.present.get('loading')
  };
}
export const AppContainer = connect(
  mapStateToProps
)(App);
