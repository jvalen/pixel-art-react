import React from 'react';
import { PaletteColorContainer } from './Palette-color';
import { connect } from 'react-redux';

export class Palette extends React.Component {
  getColors() {
    const { paletteGridData } = this.props;
    const width = 100 / 7;

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

function mapStateToProps() {
  return {};
}
export const PaletteContainer = connect(mapStateToProps)(Palette);
