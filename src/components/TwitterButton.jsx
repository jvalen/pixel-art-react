import React from 'react';
import {connect} from 'react-redux';
import {generatePixelDrawCss, shareDrawing} from '../utils/helpers';
import Modal from 'react-modal';
import * as actionCreators from '../action_creators';

export const TwitterButton = React.createClass({
  getInitialState: function() {
    return { modalIsOpen: false, charsLeft: this.props.maxChars };
  },
  handleTextChange(event) {
    let input = event.target.value;
    this.setState({charsLeft: this.props.maxChars - input.length});
  },
  tweetDrawing: function() {
    if (this.state.charsLeft >= 0) {
      const { grid, columns, rows, cellSize } = this.props;
      let cssString = generatePixelDrawCss(grid.toJS(), columns, rows, cellSize);
      shareDrawing(cssString, columns, rows, cellSize, this.refs.tweetText.value);
      this.props.showSpinner();
    }
  },
  openModal: function() {
    this.setState({modalIsOpen: true});
  },
  closeModal: function() {
    this.setState({modalIsOpen: false});
  },
  render: function() {
    let countColor = '#000000';
    if (this.state.charsLeft < 0) {
      countColor = 'red';
    }
    const customStyles = {
      content : {
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
      h2 : {
        padding: '1em 0',
        fontSize: '1.5em',
        display: 'block',
        width: '80%',
        margin: '1em auto'
      },
      h3 : {
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
      hyperlink: {
        marginTop: '1em'
      }
    };
    return (
      <div>
        <a
          className="twitter-button button"
          href="javascript:void(0);"
          style={customStyles.hyperlink}
          onClick={this.openModal}>
          <span className="fa fa-twitter"></span>
          SHARE
        </a>
        <Modal
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          style={customStyles} >

          <h2 style={customStyles.h2}>
            You are about to share your awesome drawing on Twitter
          </h2>
          <textarea
            ref="tweetText"
            style={customStyles.textarea}
            onChange={this.handleTextChange}
            defaultValue="
            made with
            http://goo.gl/73F1JR
            by @sprawlWalker
            #pixelart
            ">
          </textarea>
          <div style={customStyles.charCount} className="char-count">
            {this.state.charsLeft}
          </div>
          <h3 style={customStyles.h3}>
            Please customize your message above,
            the drawing will be automatically included
          </h3>
          <button style={customStyles.button} onClick={this.tweetDrawing}>
            <span className="fa fa-twitter"></span>TWEET
          </button>
        </Modal>
      </div>
    );
  }
});

function mapStateToProps(state) {
  return {
    grid: state.present.get('grid'),
    columns: state.present.get('columns'),
    rows: state.present.get('rows'),
    cellSize: state.present.get('cellSize')
  };
}
export const TwitterButtonContainer = connect(
  mapStateToProps,
  actionCreators
)(TwitterButton);
