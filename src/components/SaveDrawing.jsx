import React from 'react';
import {connect} from 'react-redux';
import * as actionCreators from '../action_creators';
import {generatePixelDrawCss} from '../utils/helpers';

export const SaveDrawing = React.createClass({
  save: function() {
    console.log("SaveDrawing");
    const { grid, columns, rows, cellSize } = this.props;
    let cssString = generatePixelDrawCss(grid.toJS(), columns, rows, cellSize),
        dataStored = localStorage.getItem('pixel-art-react'),
        drawingToSave = {
          id: 0,
          grid: grid,
          cellSize: cellSize,
          columns: columns,
          rows: rows
        };

    if (dataStored) {
      dataStored = JSON.parse(dataStored);

      let drawingsCount = dataStored.length;
      drawingToSave.id = drawingsCount;
      dataStored.push(drawingToSave);

      localStorage.setItem('pixel-art-react', JSON.stringify(dataStored));
    } else {
      localStorage.setItem('pixel-art-react', JSON.stringify([drawingToSave]));
    }
  },
  render: function() {
    return <button className="save-drawing" onClick={this.save}>SAVE</button>;
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
export const SaveDrawingContainer = connect(
  mapStateToProps
)(SaveDrawing);
