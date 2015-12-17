import React from 'react';
import {PixelCellContainer} from './Pixel-cell';
import {connect} from 'react-redux';

export const Grid = React.createClass({
  getCells: function() {
    //console.log('********* PIXLE-GRID getCells');
    //console.log(this.props);
    const { gridData, cellSize, columns, padding, currentColor } = this.props;
    const width = 100 / columns;

    return gridData.toJS().map((currentCell, i) =>
      <PixelCellContainer key={i} id={i} width={width} padding={padding} color={currentCell.color} currentColor={currentColor}/>
    );
  },
  render: function() {
    const style = {
      lineHeight: '0px',
      minHeight: '1px',
      margin: '0 auto',
      width: '86%',
      marginTop: '1em'
    }

    return <div className="grid-container" style={style}>
      {this.getCells()}
    </div>;
  }
});

function mapStateToProps(state) {
  return {
    gridData: state.present.get('grid'),
    cellSize: state.present.get('cellSize'),
    columns: state.present.get('columns'),
    padding: state.present.get('padding'),
    currentColor: state.present.get('currentColor')
  };
}
export const GridContainer = connect(mapStateToProps)(Grid);
