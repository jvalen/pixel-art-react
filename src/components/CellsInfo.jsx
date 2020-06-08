import React from 'react';
import { connect } from 'react-redux';

const CellsInfo = props => {
  const { columns, rows, hoveredIndex } = props;
  return (
    <div className="cellinfo">
      X :{hoveredIndex ? hoveredIndex.get('x') : '?'}/{columns}, Y :
      {hoveredIndex ? hoveredIndex.get('y') : '?'}/{rows}
    </div>
  );
};

const mapStateToProps = state => ({
  columns: state.present.getIn(['frames', 'columns']),
  rows: state.present.getIn(['frames', 'rows']),
  hoveredIndex: state.present.getIn(['frames', 'hoveredIndex'])
});

const CellsInfoContainer = connect(mapStateToProps)(CellsInfo);
export default CellsInfoContainer;
