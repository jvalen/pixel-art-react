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
    const customStyles = {
      h2: {
        padding: '2em 0',
        fontSize: '1em',
        display: 'block'
      },
      cssBlock: {
        overflowY: 'scroll',
        height: '20em',
        backgroundColor: '#313131',
        color: '#ccc',
        padding: '0.5em',
        textAlign: 'left'
      }
    };
    return (
      <div className="copycss-wrapper">
        <h2 style={customStyles.h2}>Copy the CSS generated</h2>
        <div style={customStyles.cssBlock}>
          {this.generateCSS()}
        </div>
      </div>
    );
  }
}
