import React from 'react';
import {connect} from 'react-redux';
import {generatePixelDrawCss} from '../utils/helpers';

export const Preview = React.createClass({
  generatePreview: function() {
    let dataFromParent = !!this.props.loadData;
    const { grid, columns, rows, cellSize } =
      dataFromParent ? this.props.loadData : this.props;
    let cssString = generatePixelDrawCss(
      dataFromParent ? grid : grid.toJS(),
      columns, rows, cellSize),
        style =  {
          boxShadow: cssString,
          height: cellSize,
          width: cellSize,
          marginTop: '1em'
        };

    return <div style={style}></div>;
  },
  render: function() {
    let dataFromParent = !!this.props.loadData;
    const { grid, columns, rows, cellSize } =
      dataFromParent ? this.props.loadData : this.props;

    const wrapperStyle = {
      width: columns * cellSize,
      height: rows * cellSize,
      float: 'left',
      margin: '1em'
    };

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
