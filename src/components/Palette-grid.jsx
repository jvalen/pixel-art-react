import React from 'react';
import {PaletteColorContainer} from './Palette-color';
import {connect} from 'react-redux';

export const Palette = React.createClass({
  getColors: function() {
    const { paletteGridData } = this.props;
    const width = 12;

    return paletteGridData.toJS().map((currentColor, i) =>
      <PaletteColorContainer key={i} width={width} color={currentColor.color} />
    );
  },
  render: function() {
    const style = {
      lineHeight: "0px"
    }

    return <div className="palette-container" style={style}>
      {this.getColors()}
    </div>;
  }
});

function mapStateToProps(state) {
  return {
    paletteGridData: state.get('paletteGridData')
  };
}
export const PaletteContainer = connect(mapStateToProps)(Palette);
