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
import {connect} from 'react-redux';
import * as actionCreators from '../action_creators';
import CookieBanner from 'react-cookie-banner';
import {SimpleSpinner} from './SimpleSpinner';
import {SimpleNotificationContainer} from './SimpleNotification';

export const App = React.createClass({
  componentDidMount: function () {
    let dataStored = localStorage.getItem('pixel-art-react');
    if (dataStored) {
      dataStored = JSON.parse(dataStored);
      if (dataStored.current) {
          //Load data from web storage
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
      //Initialize web storage
      dataStored = {
        'stored': [],
        'current': null
      };
      localStorage.setItem('pixel-art-react', JSON.stringify(dataStored));
    }

    this.props.hideSpinner();
  },
  render: function() {
    return <div id="pixel-art-app">
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
              </div>
              <div className="col-1-4 tools-wrapper">
                  <EraserContainer />
                  <ColorPickerContainer />
                  <EyedropperContainer />
              </div>
            </div>
            <TwitterButtonContainer maxChars="113" />
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
        <CookieBanner
          disableStyle={true}
          message="
            This website uses cookies (Twitter sharing and analytics). By
            continuing to use this website you are giving consent to cookies
            being used. Thank you."
          onAccept={() => {}}
          cookie="user-has-accepted-cookies"/>
      </div>;
  }
});

function mapStateToProps(state) {
  return {
    loading: state.present.get('loading'),
    notifications: state.present.get('notifications')
  };
}
export const AppContainer = connect(
  mapStateToProps,
  actionCreators
)(App);
