import React from 'react';
import { connect } from 'react-redux';
import { generatePixelDrawCss, generateAnimationCSSData } from '../utils/helpers';
import * as actionCreators from '../action_creators';
import { Animation } from './Animation';
import { StyleRoot } from 'radium';

/*
  Avoid error when server-side render doesn't recognize
  localstorage (browser feature)
*/
const browserStorage = (typeof localStorage === 'undefined') ? null : localStorage;

export class Preview extends React.Component {
  removeFromStorage(event) {
    if (!!browserStorage) {
      let dataStored = browserStorage.getItem('pixel-art-react');
      if (dataStored) {
        dataStored = JSON.parse(dataStored);
        dataStored.stored.splice(event.target.getAttribute('data-key'), 1);
        browserStorage.setItem('pixel-art-react', JSON.stringify(dataStored));
        this.props.sendNotification('Drawing deleted');
      }
    }
  }

  generatePreview() {
    const dataFromParent = !!this.props.loadData;
    const { frames, columns, rows, cellSize } =
      dataFromParent ? this.props.loadData : this.props;
    const { activeFrameIndex } = this.props;
    const animation = frames.length > 1;

    // Regular drawing mode
    const cssString = generatePixelDrawCss(
      frames[activeFrameIndex],
      columns, rows, cellSize);

    const styles = {
      previewWrapper: {
        boxShadow: cssString,
        height: cellSize,
        width: cellSize,
        marginTop: '1em',
        MozBoxShadow: cssString,
        WebkitBoxShadow: cssString
      },
      trashIcon: {
        position: 'relative',
        fontSize: '1.7em',
        color: 'red',
        top: '-1em',
        right: '-6.5em',
        cursor: 'no-drop',
        padding: '0.1em',
        backgroundColor: 'white',
        border: '1px solid black'
      }
    };

    const animationData =
      generateAnimationCSSData(
        frames, [0, 25, 50, 100],
        columns, rows, cellSize
      );

    return (
      <div style={animation ? null : styles.previewWrapper}>
        {animation ?
          <StyleRoot>
            <Animation duration={1} boxShadow={animationData} />
          </StyleRoot>
          : null
        }
        {dataFromParent ?
          <div
            data-key={this.props.id}
            style={styles.trashIcon}
            className="fa fa-trash-o"
            onClick={this.removeFromStorage}
          />
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
      margin: '1em 1em',
      display: 'inline-block'
    };

    if (dataFromParent) {
      wrapperStyle.width = '200px';
      wrapperStyle.height = '200px';
      wrapperStyle.border = '3px solid black';
      wrapperStyle.cursor = 'pointer';
    }

    return (
      <div className="preview" style={wrapperStyle} onClick={this.props.onClick}>
        {this.generatePreview()}
      </div>
    );
  }
}

function mapStateToProps() {
  return {};
}
export const PreviewContainer = connect(
  mapStateToProps,
  actionCreators
)(Preview);
