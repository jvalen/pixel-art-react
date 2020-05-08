import React from 'react';
import Output from './Output';
import { getCssImageClassOutput, exportAnimationData } from '../utils/cssParse';

const CopyCSS = ({
  frames,
  columns,
  cellSize,
  activeFrameIndex,
  animationCode,
  duration
}) => {
  const generateCSS = () => {
    if (animationCode) {
      const cssAnimationString = exportAnimationData(
        frames,
        columns,
        cellSize,
        duration
      );
      return cssAnimationString;
    }

    return getCssImageClassOutput(
      frames.get(activeFrameIndex),
      columns,
      cellSize
    );
  };

  return (
    <div className="copy-css">
      {animationCode ? (
        <h2>
          Paste the following code anywhere in the CSS code and assign
          <span> .pixel-animation </span>
          class to a HTML element
        </h2>
      ) : (
        <h2>
          Paste the following code anywhere in the CSS code and assign
          <span> .pixelart-to-css </span>
          class to a HTML element
        </h2>
      )}
      <Output
        copyClipboardData={{
          showButton: true,
          textButton: 'Copy',
          successMessage: 'Copied!'
        }}
        outputText={generateCSS()}
      />
    </div>
  );
};
export default CopyCSS;
