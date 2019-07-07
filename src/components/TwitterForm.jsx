import React from 'react';
import shareDrawing from '../utils/share';
import { saveProjectToStorage } from '../utils/storage';

export default class TwitterForm extends React.Component {
  constructor(props) {
    super(props);
    const initialText =
      'made with https://www.pixelartcss.com/ by @sprawlWalker #pixelart';
    this.state = {
      charsLeft: props.maxChars - initialText.length,
      initialText
    };
  }

  handleTextChange(event) {
    const { maxChars } = this.props;
    const input = event.target.value;
    this.setState({ charsLeft: maxChars - input.length });
  }

  tweetDrawing(type) {
    const { charsLeft } = this.state;
    const { actions } = this.props;
    if (charsLeft >= 0) {
      const {
        frames,
        activeFrame,
        paletteGridData,
        columns,
        rows,
        cellSize,
        duration
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
        actions.showSpinner();
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
          actions.sendNotification
        );
      } else {
        actions.sendNotification('Sorry: There was an error :(');
      }
    }
  }

  render() {
    const { initialText, charsLeft } = this.state;
    const { tweetType } = this.props;
    return (
      <div className="twitter-form">
        <h2>You are about to share your awesome drawing on Twitter</h2>
        <textarea
          ref={c => {
            this.tweetText = c;
          }}
          onChange={event => {
            this.handleTextChange(event);
          }}
          defaultValue={initialText}
        />
        <div
          className={`twitter-form__count
            ${charsLeft < 0 ? ' max-reached' : ''}`}
        >
          {charsLeft}
        </div>
        <h3>
          Please customize your message above, the drawing will be automatically
          included
        </h3>
        <button
          type="button"
          className="twitter-form__tweet"
          onClick={() => {
            this.tweetDrawing(tweetType);
          }}
        >
          <span />
          TWEET
        </button>
      </div>
    );
  }
}
