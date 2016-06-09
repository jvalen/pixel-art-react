import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../store/actions/actionCreators';
import PaletteColor from './PaletteColor';

class Palette extends React.Component {
  getColors() {
    const { paletteGridData, currentColor } = this.props;
    const width = 100 / 6;

    return paletteGridData.map((color, i) =>
      <PaletteColor
        key={i}
        width={width}
        color={color.get('color')}
        currentColor={currentColor}
        actions={{ setColorSelected: this.props.actions.setColorSelected }}
      />
    );
  }

  render() {
    return (
      <div className="palette-grid">
        {this.getColors()}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  paletteGridData: state.present.get('paletteGridData'),
  currentColor: state.present.get('currentColor')
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actionCreators, dispatch)
});

const PaletteContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Palette);
export default PaletteContainer;
