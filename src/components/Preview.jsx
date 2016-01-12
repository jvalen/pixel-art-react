import React from 'react';
import {connect} from 'react-redux';
import {generatePixelDrawCss} from '../utils/helpers';

/*
  Avoid error when server-side render doesn't recognize
  localstorage (browser feature)
*/
let browserStorage = (typeof localStorage === 'undefined') ? null : localStorage;

export const Preview = React.createClass({
  removeFromStorage: function(event) {
    if (!!browserStorage) {
      let dataStored = browserStorage.getItem('pixel-art-react');
      if (dataStored) {
        dataStored = JSON.parse(dataStored);
        dataStored.stored.splice(event.target.getAttribute('data-key'), 1);
        browserStorage.setItem('pixel-art-react', JSON.stringify(dataStored));
      }
    }
  },
  generatePreview: function() {
    let dataFromParent = !!this.props.loadData;
    const { grid, columns, rows, cellSize } =
      dataFromParent ? this.props.loadData : this.props;

    let cssString = generatePixelDrawCss(
      dataFromParent ? grid : grid.toJS(),
      columns, rows, cellSize),
        styles = {
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

    if (dataFromParent) {
      return (
        <div style={styles.previewWrapper}>
          <div
            data-key={this.props.id}
            style={styles.trashIcon}
            className="fa fa-trash-o"
            onClick={this.removeFromStorage}>
          </div>
        </div>
      );
    } else {
      return <div style={style.previewWrapper}></div>;
    }

  },
  render: function() {
    let dataFromParent = !!this.props.loadData;
    const { grid, columns, rows, cellSize } =
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

    return <div className="preview" style={wrapperStyle} onClick={this.props.onClick}>
      {this.generatePreview()}
    </div>;
  }
});

function mapStateToProps(state) {
  return {
    grid: state.present.get('grid'),
    columns: state.present.get('columns'),
    rows: state.present.get('rows'),
    cellSize: state.present.get('cellSize')
  };
}
export const PreviewContainer = connect(
  mapStateToProps
)(Preview);
