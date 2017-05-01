import React from 'react';
import CookieBanner from 'react-cookie-banner';
import PixelCanvasContainer from './PixelCanvas';
import CellSizeContainer from './CellSize';
import ColorPickerContainer from './ColorPicker';
import ModalContainer from './Modal';
import DimensionsContainer from './Dimensions';
import CssDisplayContainer from './CssDisplay';
import DurationContainer from './Duration';
import EraserContainer from './Eraser';
import BucketContainer from './Bucket';
import EyedropperContainer from './Eyedropper';
import FramesHandlerContainer from './FramesHandler';
import PaletteGridContainer from './PaletteGrid';
import ResetContainer from './Reset';
import SaveDrawingContainer from './SaveDrawing';
import NewProjectContainer from './NewProject';
import SimpleNotificationContainer from './SimpleNotification';
import SimpleSpinnerContainer from './SimpleSpinner';
import UndoRedoContainer from './UndoRedo';
import initialSetup from '../utils/startup';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      modalType: null,
      modalOpen: false,
      helpOn: false,
      showCookiesBanner: true
    };
  }

  componentDidMount() {
    initialSetup(this.props.dispatch, localStorage);
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

  hideCookiesBanner() {
    this.setState({
      showCookiesBanner: false
    });
  }

  toggleHelp() {
    this.setState({ helpOn: !this.state.helpOn });
  }

  render() {
    return (
      <div className="app__main">
        <SimpleSpinnerContainer />
        <SimpleNotificationContainer
          fadeInTime={1000}
          fadeOutTime={1500}
          duration={1500}
        />
        <div
          className="app__frames-container"
          data-tooltip={
            this.state.helpOn ?
            `Create an awesome animation secuence.
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
              <div className="app__mobile--container">
                <div className="app__mobile--group">
                  <div
                    data-tooltip={
                      this.state.helpOn ?
                      'New project'
                      : null
                    }
                  >
                    <NewProjectContainer />
                  </div>
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
                      <SaveDrawingContainer />
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
                  <div className="app__tools-wrapper grid-2">
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
                        'Sample a color from your drawing'
                        : null
                      }
                    >
                      <EyedropperContainer />
                    </div>
                    <div
                      data-tooltip={
                        this.state.helpOn ?
                        'It fills an area of the current frame based on color similarity'
                        : null
                      }
                    >
                      <BucketContainer />
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
                  </div>
                </div>
                <div className="app__mobile--group">
                  <PaletteGridContainer />
                </div>
              </div>
              <div className="app__mobile--container">
                <div className="app__mobile--group">
                  <button
                    className="app__copycss-button"
                    onClick={() => { this.changeModalType('copycss'); }}
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
            <PixelCanvasContainer />
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
                    <ResetContainer />
                  </div>
                  <div
                    data-tooltip={
                      this.state.helpOn ?
                      'Number of columns and rows'
                      : null
                    }
                  >
                    <DimensionsContainer />
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
                    <DurationContainer />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="css-container">
          <CssDisplayContainer />
        </div>
        {this.state.showCookiesBanner ?
          <CookieBanner
            disableStyle
            message="
              This website uses cookies. By continuing to use
              this website you are giving consent to cookies
              being used. Thank you. "
            link={{
              msg: '',
              url: 'http://www.jvalen.com/pixelarttocss/cookies.html',
              target: '_blank'
            }}
            onAccept={() => this.hideCookiesBanner()}
            cookie="user-has-accepted-cookies"
            dismissOnScroll={false}
          />
        :
          null
        }
        <ModalContainer
          type={this.state.modalType}
          isOpen={this.state.modalOpen}
          close={() => { this.closeModal(); }}
          open={() => { this.changeModalType(this.state.modalType); }}
        />
      </div>
    );
  }
}
