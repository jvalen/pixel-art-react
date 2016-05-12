import React from 'react';
// import { Grid } from './Pixel-grid';
import Grid from './PixelGrid';
import { DimensionsContainer } from './Dimensions';
import { UndoRedoContainer } from './UndoRedo';
import { PaletteContainer } from './Palette-grid';
import { CssDisplay } from './Css-display';
import { LoadDrawingContainer } from './LoadDrawing';
import { SaveDrawingContainer } from './SaveDrawing';
import { EraserContainer } from './Eraser';
import { ResetContainer } from './Reset';
import { EyedropperContainer } from './Eyedropper';
import { ColorPickerContainer } from './ColorPicker';
import { TwitterButtonContainer } from './TwitterButton';
import { CopyCSS } from './CopyCSS';
import { connect } from 'react-redux';
import * as actionCreators from '../action_creators';
import CookieBanner from 'react-cookie-banner';
import { SimpleSpinner } from './SimpleSpinner';
import { SimpleNotificationContainer } from './SimpleNotification';
import { DownloadDrawingContainer } from './DownloadDrawing';

export class App extends React.Component {
  componentDidMount() {
    this.props.hideSpinner();
    let dataStored = localStorage.getItem('pixel-art-react');
    if (dataStored) {
      dataStored = JSON.parse(dataStored);
      if (dataStored.current) {
        // Load data from web storage
        const { grid, paletteGridData, columns, rows, cellSize } = dataStored.current;
        this.props.setDrawing(
          grid,
          paletteGridData,
          cellSize,
          columns,
          rows
        );
      }
    } else {
      // Initialize web storage
      dataStored = {
        stored: [],
        current: null
      };
      localStorage.setItem('pixel-art-react', JSON.stringify(dataStored));
    }
  }

  render() {
    return (
      <div id="pixel-art-app">
        <SimpleSpinner spin={this.props.loading} />
        <SimpleNotificationContainer
          notification={this.props.notifications}
          fadeInTime={1000}
          fadeOutTime={1500}
          duration={1500}
        />
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
                <div className="grid grid-pad">
                  <div className="col-1-2">
                    <TwitterButtonContainer maxChars="113" />
                  </div>
                  <div className="col-1-2">
                    <DownloadDrawingContainer />
                  </div>
                </div>
              </div>
              <div className="col-1-4 tools-wrapper">
                <EraserContainer />
                <ColorPickerContainer />
                <EyedropperContainer />
              </div>
            </div>
          </div>
          <div className="col-1-2">
            <Grid
              grid={this.props.grid}
              columns={this.props.columns}
              cellSize={this.props.cellSize}
              currentColor={this.props.currentColor}
              eyedropperOn={this.props.eyedropperOn}
              eraserOn={this.props.eraserOn}
            />
          </div>
          <div className="col-1-4">
            <UndoRedoContainer />
            <DimensionsContainer />
            <ResetContainer />
            <CopyCSS
              grid={this.props.grid}
              columns={this.props.columns}
              rows={this.props.rows}
              cellSize={this.props.cellSize}
            />
          </div>
        </div>
        <div className="css-container">
          <CssDisplay
            grid={this.props.grid}
            columns={this.props.columns}
            rows={this.props.rows}
            cellSize={this.props.cellSize}
          />
        </div>
        <CookieBanner
          disableStyle
          message="
            This website uses cookies (Twitter sharing and analytics). By
            continuing to use this website you are giving consent to cookies
            being used. Thank you."
          onAccept={() => {}}
          cookie="user-has-accepted-cookies"
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    loading: state.present.get('loading'),
    notifications: state.present.get('notifications'),
    grid: state.present.get('grid'),
    columns: state.present.get('columns'),
    rows: state.present.get('rows'),
    cellSize: state.present.get('cellSize'),
    currentColor: state.present.get('currentColor'),
    eyedropperOn: state.present.get('eyedropperOn'),
    eraserOn: state.present.get('eraserOn')
  };
}
export const AppContainer = connect(
  mapStateToProps,
  actionCreators
)(App);
