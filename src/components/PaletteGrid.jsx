import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { selectPaletteColor } from '../store/actions/actionCreators';
import PaletteColor from './PaletteColor';

const PaletteGrid = (props) => {
  const getColors = () => {
    const { grid, currentColor } = props;
    const width = 100 / 6;

    return grid.map((color, i) => (
      <PaletteColor
        key={color.get('id')}
        positionInPalette={i}
        width={width}
        color={color.get('color')}
        selected={currentColor.get('position') === i}
        selectPaletteColor={props.selectPaletteColor}
      />
    ));
  };

  return (
    <div className="palette-grid">
      {getColors()}
    </div>
  );
};

const mapStateToProps = state => state.present.get('palette').toObject();

const mapDispatchToProps = dispatch => bindActionCreators({
  selectPaletteColor
}, dispatch);

const PaletteGridContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(PaletteGrid);
export default PaletteGridContainer;
