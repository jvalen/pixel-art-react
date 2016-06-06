import React from 'react';
import { connect } from 'react-redux';
import {
  generatePixelDrawCss,
  generateAnimationCSSData,
  generateAnimationIntervals
} from '../utils/helpers';
import * as actionCreators from '../actions/actionCreators';
import { Animation } from './Animation';
import { StyleRoot } from 'radium';

export class Preview extends React.Component {
  generatePreview() {
    const dataFromParent = !!this.props.loadData;
    const { frames, columns, rows, cellSize, animate } =
      dataFromParent ? this.props.loadData : this.props;
    const { activeFrameIndex } = this.props;
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

function mapStateToProps(state) {
  return {
    duration: state.present.get('duration')
  };
}
export const PreviewContainer = connect(
  mapStateToProps,
  actionCreators
)(Preview);
