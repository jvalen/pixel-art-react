import React from 'react';
import CookieConsent from 'react-cookie-consent';
import PreviewBox from './PreviewBox';
import PixelCanvasContainer from './PixelCanvas';
import CellSizeContainer from './CellSize';
import ColorPickerContainer from './ColorPicker';
import ModalContainer from './Modal';
import DimensionsContainer from './Dimensions';
import KeyBindings from './KeyBindings';
import CssDisplayContainer from './CssDisplay';
import DurationContainer from './Duration';
import EraserContainer from './Eraser';
import BucketContainer from './Bucket';
import MoveContainer from './Move';
import EyedropperContainer from './Eyedropper';
import FramesHandlerContainer from './FramesHandler';
import PaletteGridContainer from './PaletteGrid';
import ResetContainer from './Reset';
import SaveDrawingContainer from './SaveDrawing';
import NewProjectContainer from './NewProject';
import SimpleNotificationContainer from './SimpleNotification';
import SimpleSpinnerContainer from './SimpleSpinner';
import CellsInfo from './CellsInfo';
import UndoRedoContainer from './UndoRedo';
import initialSetup from '../utils/startup';
import drawHandlersProvider from '../utils/drawHandlersProvider';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      modalType: null,
      modalOpen: false,
      helpOn: false
    };
    Object.assign(this, drawHandlersProvider(this));
  }

  componentDidMount() {
    const { dispatch } = this.props;
    initialSetup(dispatch, localStorage);
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
    const { helpOn } = this.state;
    this.setState({ helpOn: !helpOn });
  }

  render() {
    const { helpOn, modalType, modalOpen } = this.state;
    return (
      <div
        className="app__main"
        onMouseUp={this.onMouseUp}
        onTouchEnd={this.onMouseUp}
        onTouchCancel={this.onMouseUp}
      >
        <SimpleSpinnerContainer />
        <SimpleNotificationContainer
          fadeInTime={1000}
          fadeOutTime={1500}
          duration={1500}
        />
        <div
          className="app__frames-container"
          data-tooltip={
            helpOn
              ? `Create an awesome animation sequence.
              You can modify the duration of each frame, changing its own value.
              The number indicates where the frame ends in a range from 0 to 100.
              `
              : null
          }
        >
          <FramesHandlerContainer />
        </div>
        <div className="app__central-container">
          <div className="left col-1-4">
            <div className="app__left-side">
              <div className="app__mobile--container max-width-container">
                <div className="app__mobile--group">
                  <div data-tooltip={helpOn ? 'New project' : null}>
                    <NewProjectContainer />
                  </div>
                  <div className="app__load-save-container">
                    <button
                      type="button"
                      className="app__load-button"
                      onClick={() => {
                        this.changeModalType('load');
                      }}
                      data-tooltip={
                        helpOn ? 'Load projects you stored before' : null
                      }
                    >
                      LOAD
                    </button>
                    <div data-tooltip={helpOn ? 'Save your project' : null}>
                      <SaveDrawingContainer />
                    </div>
                  </div>
                  <div
                    data-tooltip={helpOn ? 'Undo (CTRL+Z) Redo (CTRL+Y)' : null}
                  >
                    <UndoRedoContainer />
                  </div>
                  <div className="app__tools-wrapper grid-3">
                    <div
                      data-tooltip={
                        helpOn
                          ? 'It fills an area of the current frame based on color similarity (B)'
                          : null
                      }
                    >
                      <BucketContainer />
                    </div>
                    <div
                      data-tooltip={
                        helpOn ? 'Sample a color from your drawing (O)' : null
                      }
                    >
                      <EyedropperContainer />
                    </div>
                    <div
                      data-tooltip={
                        helpOn
                          ? 'Choose a new color that is not in your palette (P)'
                          : null
                      }
                    >
                      <ColorPickerContainer />
                    </div>
                    <div data-tooltip={helpOn ? 'Remove colors (E)' : null}>
                      <EraserContainer />
                    </div>
                    <div
                      data-tooltip={
                        helpOn
                          ? 'Move your drawing around the canvas (M)'
                          : null
                      }
                    >
                      <MoveContainer />
                    </div>
                  </div>
                </div>
                <div className="app__mobile--group">
                  <PaletteGridContainer />
                </div>
              </div>
              <div className="app__mobile--container max-width-container">
                <div className="app__mobile--group">
                  <button
                    type="button"
                    className="app__copycss-button"
                    onClick={() => {
                      this.changeModalType('copycss');
                    }}
                    data-tooltip={
                      helpOn ? 'Check your CSS generated code' : null
                    }
                  >
                    css
                  </button>
                </div>
                <div className="app__mobile--group">
                  <div className="app__social-container">
                    <div
                      data-tooltip={
                        helpOn
                          ? 'Download your creation in different formats'
                          : null
                      }
                    >
                      <button
                        type="button"
                        aria-label="Download"
                        className="app__download-button"
                        onClick={() => {
                          this.changeModalType('download');
                        }}
                      />
                    </div>
                    <div className="app__help-container">
                      <div data-tooltip="Toggle help tooltips">
                        <button
                          type="button"
                          aria-label="Help"
                          className={`app__toggle-help-button
                          ${helpOn ? ' selected' : ''}`}
                          onClick={() => {
                            this.toggleHelp();
                          }}
                        />
                      </div>
                      <div
                        data-tooltip={helpOn ? 'Show keyboard shortcuts' : null}
                      >
                        <KeyBindings
                          onClick={() => {
                            this.changeModalType('keybindings');
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="center col-2-4">
            <PixelCanvasContainer
              drawHandlersFactory={this.drawHandlersFactory}
            />
          </div>
          <div className="right col-1-4">
            <div className="app__right-side">
              <div className="app__mobile--container">
                <div className="app__mobile--group">
                  <PreviewBox
                    helpOn={helpOn}
                    callback={() => {
                      this.changeModalType('preview');
                    }}
                  />
                  <div
                    data-tooltip={helpOn ? 'Reset the selected frame' : null}
                    className="max-width-container-centered {"
                  >
                    <ResetContainer />
                  </div>
                  <div
                    data-tooltip={helpOn ? 'Number of columns and rows' : null}
                    className="max-width-container-centered {"
                  >
                    <DimensionsContainer />
                  </div>
                </div>
                <div className="app__mobile--group max-width-container-centered {">
                  <div data-tooltip={helpOn ? 'Size of one tile in px' : null}>
                    <CellSizeContainer />
                  </div>
                  <div
                    data-tooltip={
                      helpOn ? 'Animation duration in seconds' : null
                    }
                  >
                    <DurationContainer />
                    <CellsInfo />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="css-container">
          <CssDisplayContainer />
        </div>
        <CookieConsent
          location="bottom"
          buttonText="Got it!"
          cookieName="pixelartcssCookiesAccepted"
          style={{
            background: '#313131',
            fontSize: '13px',
            textAlign: 'center'
          }}
          buttonStyle={{
            background: '#bbbbbb',
            color: '#4e503b',
            fontSize: '13px'
          }}
          contentStyle={{
            flex: '1 0 200px',
            margin: '15px'
          }}
          expires={150}
        >
          By continuing to use this website you are giving consent to cookies
          being used. Thank you.
          <a
            href="/cookies"
            target="_blank"
            rel="noopener noreferrer nofollow"
            style={{ textDecoration: 'none', color: '#5786c1' }}
          >
            {' '}
            Learn more
          </a>
        </CookieConsent>
        <ModalContainer
          type={modalType}
          isOpen={modalOpen}
          close={() => {
            this.closeModal();
          }}
          open={() => {
            this.changeModalType(modalType);
          }}
        />
      </div>
    );
  }
}
