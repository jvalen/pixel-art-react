import React from 'react';
import { PaletteColorContainer } from './Palette-color';
import { connect } from 'react-redux';

export class Palette extends React.Component {
  getColors() {
    const { paletteGridData } = this.props;
    const width = 100 / 4;

    return paletteGridData.map((currentColor, i) => {
      return (
        <PaletteColorContainer
          key={i}
          width={width}
          color={currentColor.get('color')}
        />
      );
    });
  }

  render() {
    return (
      <div className="palette-grid">
        {this.getColors()}
      </div>
    );
  }
}

function mapStateToProps() {
  return {};
}
export const PaletteContainer = connect(mapStateToProps)(Palette);
