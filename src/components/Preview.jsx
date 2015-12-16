import React from 'react';
import {connect} from 'react-redux';
import {generatePixelDrawCss} from '../utils/helpers';

export const Preview = React.createClass({
  generatePreview: function() {
    const { grid, columns, rows, cellSize } = this.props;
    let cssString = generatePixelDrawCss(grid.toJS(), columns, rows, cellSize);

    let style =  {
      boxShadow: cssString,
      height: cellSize,
      width: cellSize,
      marginTop: '1em'
    };

    return <div style={style}></div>;
  },
  render: function() {
    return <div className="preview">
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
