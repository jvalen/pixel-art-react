import React from 'react';
import {connect} from 'react-redux';
import {generatePixelDrawCss} from '../utils/helpers';
// import AlertContainer from 'react-alert';
// import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import * as actionCreators from '../action_creators';

export const SaveDrawing = React.createClass({
  save: function() {
    const { grid, columns, rows, cellSize, paletteGridData } = this.props;
    let cssString = generatePixelDrawCss(grid.toJS(), columns, rows, cellSize),
        dataStored = localStorage.getItem('pixel-art-react'),
        drawingToSave = {
          id: 0,
          grid: grid,
          paletteGridData: paletteGridData,
          cellSize: cellSize,
          columns: columns,
          rows: rows
        };

    if (dataStored) {
      //Data exist in the web storage
      dataStored = JSON.parse(dataStored);

      let drawingsCount = dataStored.length;
      drawingToSave.id = drawingsCount;
      dataStored.stored.push(drawingToSave);
    } else {
      //No data in the web storage
      dataStored = {
        'stored': [drawingToSave],
        'current': null
      };
    }

    localStorage.setItem('pixel-art-react', JSON.stringify(dataStored));

    this.props.sendNotification('Drawing saved');
  },
  render: function() {
    return(
      <div>
        <button className="save-drawing red" onClick={this.save}>SAVE</button>
      </div>
      );
  }
});

function mapStateToProps(state) {
  return {
    grid: state.present.get('grid'),
    paletteGridData: state.present.get('paletteGridData'),
    columns: state.present.get('columns'),
    rows: state.present.get('rows'),
    cellSize: state.present.get('cellSize'),
  };
}
export const SaveDrawingContainer = connect(
  mapStateToProps,
  actionCreators
)(SaveDrawing);
