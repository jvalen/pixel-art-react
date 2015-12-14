import React from 'react';
import {PixelCellContainer} from './Pixel-cell';
import {connect} from 'react-redux';

export const Grid = React.createClass({
  getCells: function() {
    //console.log('********* PIXLE-GRID getCells');
    //console.log(this.props);
    const { gridData, cellSize, columns, padding, currentColor } = this.props;
    const width = Math.floor(100 / columns);

    return gridData.toJS().map((currentCell, i) =>
      <PixelCellContainer key={i} id={i} width={width} padding={padding} color={currentCell.color} currentColor={currentColor}/>
    );
  },
  render: function() {
    const style = {
      lineHeight: "0px"
    }

    return <div className="grid-container" style={style}>
      {this.getCells()}
    </div>;
  }
});

function mapStateToProps(state) {
  return {
    gridData: state.get('grid'),
    cellSize: state.get('cellSize'),
    columns: state.get('columns'),
    padding: state.get('padding'),
    currentColor: state.get('currentColor')
  };
}
export const GridContainer = connect(mapStateToProps)(Grid);
