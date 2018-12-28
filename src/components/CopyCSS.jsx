import React from 'react';
import { getCssImageClassOutput, exportAnimationData } from '../utils/cssParse';

const CopyCSS = props => {
  const generateCSS = () => {
    const {
      frames,
      columns,
      cellSize,
      activeFrameIndex,
      animationCode,
      duration
    } = props;

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
      {props.animationCode ? (
        <h2>
          Paste the following code anywhere in the CSS code and assign
          <span> .pixel-animation</span> class to a HTML element
        </h2>
      ) : (
        <h2>
          Paste the following code anywhere in the CSS code and assign
          <span> .pixelart-to-css</span> class to a HTML element
        </h2>
      )}
      <pre className="copy-css__string">{generateCSS()}</pre>
    </div>
  );
};
export default CopyCSS;
