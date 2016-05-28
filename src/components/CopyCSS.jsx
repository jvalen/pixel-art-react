import React from 'react';
import {
  generatePixelDrawCss,
  generateAnimationCSSData,
  generateAnimationIntervals,
  exportAnimationData
} from '../utils/helpers';

export class CopyCSS extends React.Component {
  generateCSS() {
    const {
      frames, columns, rows,
      cellSize, activeFrameIndex,
      animationCode, duration
    } = this.props;

    if (animationCode) {
      const cssAnimationString = exportAnimationData(
        generateAnimationCSSData(
          frames, generateAnimationIntervals(frames),
          columns, rows, cellSize
        ), duration);
      return cssAnimationString;
    }
    // Show info of only one frame
    let cssString = generatePixelDrawCss(
      frames.get(activeFrameIndex),
      columns,
      rows,
      cellSize,
      'string'
    );
    if (!!cssString) {
      cssString = `box-shadow: ${cssString}; `;
      cssString += `height: ${cellSize}px; width: ${cellSize}px;`;
    }
    return cssString;
  }

  render() {
    return (
      <div className="copy-css">
        <h2>Copy the CSS generated</h2>
        <div className="copy-css__string">
          {this.generateCSS()}
        </div>
      </div>
    );
  }
}
