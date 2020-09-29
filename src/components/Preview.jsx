import React from 'react';
import {
  generatePixelDrawCss,
  generateAnimationCSSData
} from '../utils/cssParse';
import Animation from './Animation';

const Preview = props => {
  const generatePreview = () => {
    const { activeFrameIndex, duration, storedData, animationName } = props;
    const { frames, columns, cellSize, animate } = storedData || props;
    const animation = frames.size > 1 && animate;
    let animationData;
    let cssString;

    const styles = {
      previewWrapper: {
        height: cellSize,
        width: cellSize,
        position: 'absolute',
        top: '-5px',
        left: '-5px'
      }
    };

    if (animation) {
      animationData = generateAnimationCSSData(frames, columns, cellSize);
    } else {
      cssString = generatePixelDrawCss(
        frames.get(activeFrameIndex),
        columns,
        cellSize,
        'string'
      );

      styles.previewWrapper.boxShadow = cssString;
      styles.previewWrapper.MozBoxShadow = cssString;
      styles.previewWrapper.WebkitBoxShadow = cssString;
    }

    return (
      <div style={animation ? null : styles.previewWrapper}>
        {animation ? (
          <Animation
            duration={duration}
            boxShadow={animationData}
            name={animationName}
          />
        ) : null}
      </div>
    );
  };

  const { storedData } = props;
  const { columns, rows, cellSize } = storedData || props;
  const style = {
    width: columns * cellSize,
    height: rows * cellSize,
    position: 'relative'
  };

  return (
    <div className="preview" style={style}>
      {generatePreview()}
    </div>
  );
};
export default Preview;
