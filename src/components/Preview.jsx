import React from 'react';
import { connect } from 'react-redux';
import {
  generatePixelDrawCss,
  generateAnimationCSSData,
  generateAnimationIntervals
} from '../utils/helpers';
import * as actionCreators from '../action_creators';
import { Animation } from './Animation';
import { StyleRoot } from 'radium';

export class Preview extends React.Component {
  generatePreview() {
    const dataFromParent = !!this.props.loadData;
    const { frames, columns, rows, cellSize } =
      dataFromParent ? this.props.loadData : this.props;
    const { activeFrameIndex } = this.props;
    const animation = frames.length > 1;
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
        frames[activeFrameIndex],
        columns, rows, cellSize);

      styles.previewWrapper.boxShadow = cssString;
      styles.previewWrapper.MozBoxShadow = cssString;
      styles.previewWrapper.WebkitBoxShadow = cssString;
    }

    return (
      <div style={animation ? null : styles.previewWrapper}>
        {animation ?
          <StyleRoot>
            <Animation
              duration={this.props.duration}
              boxShadow={animationData}
            />
          </StyleRoot>
          : null
        }
      </div>
    );
  }

  render() {
    const dataFromParent = !!this.props.loadData;
    const { columns, rows, cellSize } =
      dataFromParent ? this.props.loadData : this.props;

    const wrapperStyle = {
      width: columns * cellSize,
      height: rows * cellSize,
      display: 'inline-block',
      position: 'relative'
    };

    return (
      <div className="preview" style={wrapperStyle} onClick={this.props.onClick}>
        {this.generatePreview()}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    duration: state.present.get('duration')
  };
}
export const PreviewContainer = connect(
  mapStateToProps,
  actionCreators
)(Preview);
