import React from 'react';
import Grid from './Pixel-grid';
import { DimensionsContainer } from './Dimensions';
import { UndoRedoContainer } from './UndoRedo';
import { PaletteContainer } from './Palette-grid';
import { CssDisplay } from './Css-display';
import { SaveDrawingContainer } from './SaveDrawing';
import { EraserContainer } from './Eraser';
import { ResetContainer } from './Reset';
import { EyedropperContainer } from './Eyedropper';
import { ColorPickerContainer } from './ColorPicker';
import { connect } from 'react-redux';
import * as actionCreators from '../action_creators';
import CookieBanner from 'react-cookie-banner';
import { SimpleSpinner } from './SimpleSpinner';
import { SimpleNotificationContainer } from './SimpleNotification';
import FramesHandler from './FramesHandler';
import Duration from './Duration';
import Modal from './Modal';

export class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalType: null,
      modalOpen: false
    };
  }

  componentDidMount() {
    this.props.hideSpinner();
    let dataStored = localStorage.getItem('pixel-art-react');
    if (dataStored) {
      dataStored = JSON.parse(dataStored);
      if (dataStored.current) {
        // Load data from web storage
        const { frames, paletteGridData, columns, rows, cellSize } = dataStored.current;
        this.props.setDrawing(
          frames,
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

  changeModalType(type) {
    this.setState({
      modalType: type,
      modalOpen: true
    });
  }

  closeModal() {
    this.setState({
      modalOpen: false
    });
  }

  render() {
    return (
      <div id="app">
        <SimpleSpinner spin={this.props.loading} />
        <SimpleNotificationContainer
          notification={this.props.notifications}
          fadeInTime={1000}
          fadeOutTime={1500}
          duration={1500}
        />
        <div className="app__frames-container">
          <div className="col-7-8">
            <FramesHandler
              frames={this.props.frames}
              columns={this.props.columns}
              rows={this.props.rows}
              activeFrameIndex={this.props.activeFrameIndex}
            />
          </div>
          <div className="col-1-8">
            <Duration
              duration={this.props.duration}
              setDuration={this.props.setDuration}
            />
          </div>
        </div>
        <div className="app__central-container">
          <div className="col-1-4">
            <div className="app__load-save-container">
              <button
                className="app__load-button"
                onClick={() => { this.changeModalType('load'); }}
              >
                LOAD
              </button>
              <SaveDrawingContainer
                frames={this.props.frames}
                columns={this.props.columns}
                rows={this.props.rows}
                cellSize={this.props.cellSize}
                paletteGridData={this.props.paletteGridData}
              />
            </div>
            <div className="col-3-4">
              <PaletteContainer
                paletteGridData={this.props.paletteGridData}
              />
              <div className="app__social-container">
                <button
                  className="app__twitter-button"
                  onClick={() => { this.changeModalType('twitter'); }}
                />
                <button
                  className="app__download-button"
                  onClick={() => { this.changeModalType('download'); }}
                />
              </div>
            </div>
            <div className="col-1-4 tools-wrapper">
              <EraserContainer />
              <ColorPickerContainer />
              <EyedropperContainer />
            </div>
          </div>
          <div className="col-2-4">
            <Grid
              columns={this.props.columns}
              currentColor={this.props.currentColor}
              eyedropperOn={this.props.eyedropperOn}
              eraserOn={this.props.eraserOn}
              dragging={this.props.dragging}
              activeFrame={this.props.activeFrame}
            />
          </div>
          <div className="col-1-4">
            <UndoRedoContainer />
            <DimensionsContainer
              frames={this.props.frames}
              columns={this.props.columns}
              rows={this.props.rows}
              cellSize={this.props.cellSize}
              activeFrameIndex={this.props.activeFrameIndex}
            />
            <button
              className="app__preview-button"
              onClick={() => { this.changeModalType('preview'); }}
            >
              Preview
            </button>
            <ResetContainer
              columns={this.props.columns}
              rows={this.props.rows}
              activeFrameIndex={this.props.activeFrameIndex}
            />
            <button
              className="app__copycss-button"
              onClick={() => { this.changeModalType('copycss'); }}
              frames={this.props.frames}
              columns={this.props.columns}
              rows={this.props.rows}
              cellSize={this.props.cellSize}
              activeFrameIndex={this.props.activeFrameIndex}
            >
              CSS
            </button>
          </div>
        </div>
        <div className="css-container">
          <CssDisplay
            activeFrame={this.props.activeFrame}
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
        <Modal
          type={this.state.modalType}
          isOpen={this.state.modalOpen}
          close={() => { this.closeModal(); }}
          frames={this.props.frames}
          columns={this.props.columns}
          rows={this.props.rows}
          cellSize={this.props.cellSize}
          activeFrameIndex={this.props.activeFrameIndex}
          duration={this.props.duration}
          activeFrame={this.props.activeFrame}
          paletteGridData={this.props.paletteGridData}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  const frames = state.present.get('frames');
  const activeFrameIndex = state.present.get('activeFrameIndex');

  return {
    frames,
    activeFrame: frames.get(activeFrameIndex),
    paletteGridData: state.present.get('paletteGridData'),
    notifications: state.present.get('notifications'),
    activeFrameIndex,
    loading: state.present.get('loading'),
    columns: state.present.get('columns'),
    rows: state.present.get('rows'),
    cellSize: state.present.get('cellSize'),
    currentColor: state.present.get('currentColor'),
    eyedropperOn: state.present.get('eyedropperOn'),
    eraserOn: state.present.get('eraserOn'),
    dragging: state.present.get('dragging'),
    duration: state.present.get('duration')
  };
}
export const AppContainer = connect(
  mapStateToProps,
  actionCreators
)(App);
