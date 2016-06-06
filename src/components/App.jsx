import React from 'react';
import Grid from './Pixel-grid';
import { DimensionsContainer } from './Dimensions';
import { CellSizeContainer } from './CellSize';
import { UndoRedoContainer } from './UndoRedo';
import { PaletteContainer } from './Palette-grid';
import { CssDisplay } from './Css-display';
import { SaveDrawingContainer } from './SaveDrawing';
import { EraserContainer } from './Eraser';
import { ResetContainer } from './Reset';
import { EyedropperContainer } from './Eyedropper';
import { ColorPickerContainer } from './ColorPicker';
import { connect } from 'react-redux';
import * as actionCreators from '../actions/actionCreators';
import CookieBanner from 'react-cookie-banner';
import { SimpleSpinner } from './SimpleSpinner';
import { SimpleNotificationContainer } from './SimpleNotification';
import { FramesHandlerContainer } from './FramesHandler';
import Duration from './Duration';
import Modal from './Modal';
import { initStorage, getDataFromStorage } from '../utils/storage';

export class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalType: null,
      modalOpen: false,
      helpOn: false
    };
  }

  componentDidMount() {
    this.props.hideSpinner();

    const dataStored = getDataFromStorage(localStorage);
    if (dataStored) {
      // Load current project from the storage
      const currentProjectIndex = dataStored.current;
      if (currentProjectIndex >= 0) {
        const {
          frames, paletteGridData, columns, rows, cellSize
        } = dataStored.stored[currentProjectIndex];

        this.props.setDrawing(
          frames,
          paletteGridData,
          cellSize,
          columns,
          rows
        );
      }
    } else {
      // If no data initialize storage
      initStorage(localStorage);
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

  toggleHelp() {
    this.setState({ helpOn: !this.state.helpOn });
  }

  render() {
    return (
      <div className="app__main">
        <SimpleSpinner spin={this.props.loading} />
        <SimpleNotificationContainer
          notification={this.props.notifications}
          fadeInTime={1000}
          fadeOutTime={1500}
          duration={1500}
        />
        <div
          className="app__frames-container"
          data-tooltip={
            this.state.helpOn ?
            'Add frames to create an awesome animation' : null
          }
        >
          <FramesHandlerContainer
            frames={this.props.frames}
            columns={this.props.columns}
            rows={this.props.rows}
            activeFrameIndex={this.props.activeFrameIndex}
          />
        </div>
        <div className="app__central-container">
          <div className="left col-1-4">
            <div className="app__left-side">
              <div className="app__mobile--container">
                <div className="app__mobile--group">
                  <div className="app__load-save-container">
                    <button
                      className="app__load-button"
                      onClick={() => { this.changeModalType('load'); }}
                      data-tooltip={
                        this.state.helpOn ?
                        'Load projects you stored before'
                        : null
                      }
                    >
                      LOAD
                    </button>
                    <div
                      data-tooltip={
                        this.state.helpOn ?
                        'Save your project'
                        : null
                      }
                    >
                      <SaveDrawingContainer
                        frames={this.props.frames}
                        columns={this.props.columns}
                        rows={this.props.rows}
                        cellSize={this.props.cellSize}
                        paletteGridData={this.props.paletteGridData}
                      />
                    </div>
                  </div>
                  <div
                    data-tooltip={
                      this.state.helpOn ?
                      'Undo Redo actions'
                      : null
                    }
                  >
                    <UndoRedoContainer />
                  </div>
                  <div className="app__tools-wrapper grid-3">
                    <div
                      data-tooltip={
                        this.state.helpOn ?
                        'Remove colors'
                        : null
                      }
                    >
                      <EraserContainer />
                    </div>
                    <div
                      data-tooltip={
                        this.state.helpOn ?
                        'Choose a new color that is not in your palette'
                        : null
                      }
                    >
                      <ColorPickerContainer />
                    </div>
                    <div
                      data-tooltip={
                        this.state.helpOn ?
                        'Sample a color from your drawing'
                        : null
                      }
                    >
                      <EyedropperContainer />
                    </div>
                  </div>
                </div>
                <div className="app__mobile--group">
                  <PaletteContainer
                    paletteGridData={this.props.paletteGridData}
                  />
                </div>
              </div>
              <div className="app__mobile--container">
                <div className="app__mobile--group">
                  <button
                    className="app__copycss-button"
                    onClick={() => { this.changeModalType('copycss'); }}
                    frames={this.props.frames}
                    columns={this.props.columns}
                    rows={this.props.rows}
                    cellSize={this.props.cellSize}
                    activeFrameIndex={this.props.activeFrameIndex}
                    data-tooltip={
                      this.state.helpOn ?
                      'Check your CSS generated code'
                      : null
                    }
                  >
                    css
                  </button>
                </div>
                <div className="app__mobile--group">
                  <div className="app__social-container">
                    <div
                      data-tooltip={
                        this.state.helpOn ?
                        'Tweet your creation in different formats'
                        : null
                      }
                    >
                      <button
                        className="app__twitter-button"
                        onClick={() => { this.changeModalType('twitter'); }}
                      />
                    </div>
                    <div
                      data-tooltip={
                        this.state.helpOn ?
                        'Download your creation in different formats'
                        : null
                      }
                    >
                      <button
                        className="app__download-button"
                        onClick={() => { this.changeModalType('download'); }}
                      />
                    </div>
                    <div data-tooltip="Toggle help tooltips">
                      <button
                        className={
                          `app__toggle-help-button
                          ${this.state.helpOn ? ' selected' : ''}`
                        }
                        onClick={() => { this.toggleHelp(); }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="center col-2-4">
            <Grid
              columns={this.props.columns}
              currentColor={this.props.currentColor}
              eyedropperOn={this.props.eyedropperOn}
              eraserOn={this.props.eraserOn}
              dragging={this.props.dragging}
              activeFrame={this.props.activeFrame}
            />
          </div>
          <div className="right col-1-4">
            <div className="app__right-side">
              <div className="app__mobile--container">
                <div className="app__mobile--group">
                  <button
                    className="app__preview-button"
                    onClick={() => { this.changeModalType('preview'); }}
                    data-tooltip={
                      this.state.helpOn ?
                      'Show a preview of your project'
                      : null
                    }
                  >
                    PREVIEW
                  </button>
                  <div
                    data-tooltip={
                      this.state.helpOn ?
                      'Reset the selected frame'
                      : null
                    }
                  >
                    <ResetContainer
                      columns={this.props.columns}
                      rows={this.props.rows}
                      activeFrameIndex={this.props.activeFrameIndex}
                    />
                  </div>
                  <div
                    data-tooltip={
                      this.state.helpOn ?
                      'Number of columns and rows'
                      : null
                    }
                  >
                    <DimensionsContainer
                      frames={this.props.frames}
                      columns={this.props.columns}
                      rows={this.props.rows}
                      cellSize={this.props.cellSize}
                      activeFrameIndex={this.props.activeFrameIndex}
                    />
                  </div>
                </div>
                <div className="app__mobile--group">
                  <div
                    data-tooltip={
                      this.state.helpOn ?
                      'Size of one tile in px'
                      : null
                    }
                  >
                    <CellSizeContainer />
                  </div>
                  <div
                    data-tooltip={
                      this.state.helpOn ?
                      'Animation duration in seconds'
                      : null
                    }
                  >
                    <Duration
                      duration={this.props.duration}
                      setDuration={this.props.setDuration}
                    />
                  </div>
                </div>
              </div>
            </div>
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
