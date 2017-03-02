import React from 'react';
import { StyleRoot } from 'radium';
import {
  generatePixelDrawCss,
  generateAnimationCSSData,
  generateAnimationIntervals
} from '../utils/cssParse';
import Animation from './Animation';

const Preview = (props) => {
  const generatePreview = () => {
    const { activeFrameIndex, duration } = props;
    const { frames, columns, rows, cellSize, animate } =
      props.storedData || props;
    const animation = frames.size > 1 && animate;
    let animationData;
    let cssString;

    const styles = {
      previewWrapper: {
        height: cellSize,
        width: cellSize
      }
    };

    if (animation) {
      animationData =
      generateAnimationCSSData(
        frames, generateAnimationIntervals(frames),
        columns, rows, cellSize
      );
    } else {
      cssString = generatePixelDrawCss(
        frames.get(activeFrameIndex),
        columns, rows, cellSize, 'string'
      );

      styles.previewWrapper.boxShadow = cssString;
      styles.previewWrapper.MozBoxShadow = cssString;
      styles.previewWrapper.WebkitBoxShadow = cssString;
    }

    return (
      <div style={animation ? null : styles.previewWrapper}>
        {animation ?
          <StyleRoot>
            <Animation
              duration={duration}
              boxShadow={animationData}
            />
          </StyleRoot>
          : null
        }
      </div>
    );
  };

  const { columns, rows, cellSize } = props.storedData || props;
  const style = {
    width: columns * cellSize,
    height: rows * cellSize
  };

  return (
    <div className="preview" style={style}>
      {generatePreview()}
    </div>
  );
};
export default Preview;
