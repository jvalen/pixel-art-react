import React from 'react';
import { connect } from 'react-redux';

const CellsInfo = props => {
  const { hoveredIndex } = props;
  const xPos = hoveredIndex ? hoveredIndex.get('x') : '0';
  const yPos = hoveredIndex ? hoveredIndex.get('y') : '0';
  return (
    <>{hoveredIndex && <div className="cellinfo">{`${xPos}, ${yPos}`}</div>}</>
  );
};

const mapStateToProps = state => ({
  hoveredIndex: state.present.getIn(['frames', 'hoveredIndex'])
});

const CellsInfoContainer = connect(mapStateToProps)(CellsInfo);
export default CellsInfoContainer;
