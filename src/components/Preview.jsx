import React from 'react';
import {
  generatePixelDrawCss,
  generateAnimationCSSData,
  generateAnimationIntervals
} from '../utils/cssParse';
import { Animation } from './Animation';
import { StyleRoot } from 'radium';

export default class Preview extends React.Component {
  generatePreview() {
    const { activeFrameIndex, duration } = this.props;
    const { frames, columns, rows, cellSize, animate } =
      this.props.storedData || this.props;
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
  }

  render() {
    const { columns, rows, cellSize } = this.props.storedData || this.props;
    const style = {
      width: columns * cellSize,
      height: rows * cellSize
    };

    return (
      <div className="preview" style={style} onClick={this.props.onClick}>
        {this.generatePreview()}
      </div>
    );
  }
}
