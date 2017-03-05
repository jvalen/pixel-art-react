import React from 'react';
import {
  generatePixelDrawCss,
  generateAnimationCSSData,
  generateAnimationIntervals,
  exportAnimationData
} from '../utils/cssParse';

const CopyCSS = (props) => {
  const generateCSS = () => {
    const {
      frames, columns, rows,
      cellSize, activeFrameIndex,
      animationCode, duration
    } = props;

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
    if (cssString) {
      cssString = `.pixelart-to-css {\n  box-shadow: ${cssString};\n  `;
      cssString += `height: ${cellSize}px;\n  width: ${cellSize}px;\n}`;
    }
    return cssString;
  };

  return (
    <div className="copy-css">
      {props.animationCode ?
        <h2>
          Paste the following code anywhere in the CSS code and assign
          <span> .pixel-animation</span> class to a HTML element
        </h2>
        :
        <h2>
          Paste the following code anywhere in the CSS code and assign
          <span> .pixelart-to-css</span> class to a HTML element
        </h2>
      }
      <pre className="copy-css__string">
        {generateCSS()}
      </pre>
    </div>
  );
};
export default CopyCSS;
