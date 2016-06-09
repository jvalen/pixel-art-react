import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../store/actions/actionCreators';
import PaletteColor from './PaletteColor';

const PaletteGrid = (props) => {
  const getColors = () => {
    const { paletteGridData, currentColor } = props;
    const width = 100 / 6;

    return paletteGridData.map((color, i) =>
      <PaletteColor
        key={i}
        width={width}
        color={color.get('color')}
        currentColor={currentColor}
        actions={{ setColorSelected: props.actions.setColorSelected }}
      />
    );
  };

  return (
    <div className="palette-grid">
      {getColors()}
    </div>
  );
};

const mapStateToProps = (state) => ({
  paletteGridData: state.present.get('paletteGridData'),
  currentColor: state.present.get('currentColor')
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actionCreators, dispatch)
});

const PaletteGridContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(PaletteGrid);
export default PaletteGridContainer;
