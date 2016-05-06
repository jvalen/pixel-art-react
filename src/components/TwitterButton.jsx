import React from 'react';
import { connect } from 'react-redux';
import { generatePixelDrawCss, shareDrawing } from '../utils/helpers';
import Modal from 'react-modal';
import * as actionCreators from '../action_creators';

export class TwitterButton extends React.Component {
  constructor(props) {
    super(props);
    const initialText = 'made with http://goo.gl/73F1JR by @sprawlWalker #pixelart';
    this.state = {
      modalIsOpen: false,
      charsLeft: props.maxChars - initialText.length,
      initialText
    };
  }

  handleTextChange(event) {
    const input = event.target.value;
    this.setState({ charsLeft: this.props.maxChars - input.length });
  }

  tweetDrawing() {
    if (this.state.charsLeft >= 0) {
      const { grid, paletteGridData, columns, rows, cellSize } = this.props;
      // Store current drawing in the web storage
      let dataStored = localStorage.getItem('pixel-art-react');
      const drawingToSave = {
        id: 0,
        grid,
        paletteGridData,
        cellSize,
        columns,
        rows
      };

      if (dataStored) {
        dataStored = JSON.parse(dataStored);
        dataStored.current = drawingToSave;
        localStorage.setItem('pixel-art-react', JSON.stringify(dataStored));
      }

      // Generate CSS and send to the server
      const cssString = generatePixelDrawCss(grid.toJS(), columns, rows, cellSize);
      this.props.showSpinner();
      shareDrawing(
        {
          css: cssString,
          columns,
          rows,
          cellSize,
        },
        this.refs.tweetText.value,
        'twitter'
      );
    }
  }

  openModal() {
    this.setState({ modalIsOpen: true });
  }

  closeModal() {
    this.setState({ modalIsOpen: false });
  }

  render() {
    let countColor = '#000000';
    if (this.state.charsLeft < 0) {
      countColor = 'red';
    }
    const customStyles = {
      content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        textAlign: 'center',
        border: '4px solid #C5C5C5',
        width: '80%',
        padding: '1em'
      },
      h2: {
        padding: '1em 0',
        fontSize: '1.5em',
        display: 'block',
        width: '80%',
        margin: '1em auto'
      },
      h3: {
        padding: '1em 0',
        fontSize: '1em',
        display: 'block',
        width: '80%',
        margin: '1em auto'
      },
      textarea: {
        width: '80%',
        resize: 'none',
        height: '6em'
      },
      charCount: {
        margin: '1em auto',
        color: countColor
      },
      button: {
        margin: '1em auto'
      },
      buttonWrapper: {
        margin: '0 auto',
        display: 'table'
      }
    };
    return (
      <div style={customStyles.buttonWrapper}>
        <button
          className="twitter-button button"
          onClick={() => { this.openModal(); }}
        >
          <span className="fa fa-twitter"></span>
        </button>
        <Modal
          isOpen={this.state.modalIsOpen}
          onRequestClose={() => { this.closeModal(); }}
          style={customStyles}
        >
          <h2 style={customStyles.h2}>
            You are about to share your awesome drawing on Twitter
          </h2>
          <textarea
            ref="tweetText"
            style={customStyles.textarea}
            onChange={(event) => { this.handleTextChange(event); }}
            defaultValue={this.state.initialText}
          >
          </textarea>
          <div style={customStyles.charCount} className="char-count">
            {this.state.charsLeft}
          </div>
          <h3 style={customStyles.h3}>
            Please customize your message above,
            the drawing will be automatically included
          </h3>
          <button
            style={customStyles.button}
            onClick={() => { this.tweetDrawing(); }}
          >
            <span className="fa fa-twitter"></span>TWEET
          </button>
        </Modal>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    grid: state.present.get('grid'),
    paletteGridData: state.present.get('paletteGridData'),
    columns: state.present.get('columns'),
    rows: state.present.get('rows'),
    cellSize: state.present.get('cellSize')
  };
}
export const TwitterButtonContainer = connect(
  mapStateToProps,
  actionCreators
)(TwitterButton);
