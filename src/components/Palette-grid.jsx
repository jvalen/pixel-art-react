import React from 'react';
import { PaletteColorContainer } from './Palette-color';
import { connect } from 'react-redux';

export class Palette extends React.Component {
  getColors() {
    const { paletteGridData } = this.props;
    const width = 100 / 7;

    return paletteGridData.toJS().map((currentColor, i) => {
      return (
        <PaletteColorContainer
          key={i}
          width={width}
          color={currentColor.color}
        />
      );
    });
  }

  render() {
    const style = {
      lineHeight: 0,
      backgroundColor: '#333333',
      textAlign: 'center',
      padding: '0.2em'
    };

    return (
      <div className="palette-container" style={style}>
        {this.getColors()}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    paletteGridData: state.present.get('paletteGridData')
  };
}
export const PaletteContainer = connect(mapStateToProps)(Palette);
