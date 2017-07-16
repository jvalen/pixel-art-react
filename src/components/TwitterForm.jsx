import React from 'react';
import shareDrawing from '../utils/share';
import { saveProjectToStorage } from '../utils/storage';

export default class TwitterForm extends React.Component {
  constructor(props) {
    super(props);
    const initialText = 'made with https://www.pixelartcss.com/ by @sprawlWalker #pixelart';
    this.state = {
      charsLeft: props.maxChars - initialText.length,
      initialText
    };
  }

  handleTextChange(event) {
    const input = event.target.value;
    this.setState({ charsLeft: this.props.maxChars - input.length });
  }

  tweetDrawing(type) {
    if (this.state.charsLeft >= 0) {
      const {
        frames, activeFrame, paletteGridData,
        columns, rows, cellSize, duration
      } = this.props;

      // Store current drawing in the storage
      const drawingToSave = {
        frames,
        paletteGridData,
        cellSize,
        columns,
        rows,
        animate: frames.size > 1
      };
      if (saveProjectToStorage(localStorage, drawingToSave)) {
        this.props.actions.showSpinner();
        shareDrawing(
          {
            type,
            frames,
            activeFrame,
            columns,
            rows,
            cellSize,
            duration
          },
          this.tweetText.value,
          'twitter',
          this.props.actions.sendNotification
        );
      } else {
        this.props.actions.sendNotification('Sorry: There was an error :(');
      }
    }
  }

  render() {
    return (
      <div className="twitter-form">
        <h2>
          You are about to share your awesome drawing on Twitter
        </h2>
        <textarea
          ref={(c) => { this.tweetText = c; }}
          onChange={(event) => { this.handleTextChange(event); }}
          defaultValue={this.state.initialText}
        />
        <div
          className={
            `twitter-form__count
            ${this.state.charsLeft < 0 ? ' max-reached' : ''}`
          }
        >
          {this.state.charsLeft}
        </div>
        <h3>
          Please customize your message above,
          the drawing will be automatically included
        </h3>
        <button
          className="twitter-form__tweet"
          onClick={() => { this.tweetDrawing(this.props.tweetType); }}
        >
          <span />TWEET
        </button>
      </div>
    );
  }
}
