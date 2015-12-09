import React from 'react';
import Cell from './Pixel-cell';
import {connect} from 'react-redux';

export const Grid = React.createClass({
  getCells: function() {
    console.log('********* PIXLE-GRID getCells');
    console.log(this.props);
    const { gridData, cellSize, columns, padding } = this.props;
    const width = Math.floor(100 / columns);

    return gridData.toJS().map(row =>
      row.map(currentCell =>
          <Cell width={width} padding={padding} color={currentCell.color}/>
      )
    );
  },
  render: function() {
    const style = {
      lineHeight: "0px",
      width: "50%",
      float: "left"
    }

    return <div className="grid" style={style}>
      {this.getCells()}
    </div>;
  }
});

function mapStateToProps(state) {
  return {
    gridData: state.get('grid'),
    cellSize: state.get('cellSize'),
    columns: state.get('columns'),
    padding: state.get('padding')
  };
}
export const GridContainer = connect(mapStateToProps)(Grid);
