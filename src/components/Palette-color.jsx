import React from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../action_creators';

export class PaletteColor extends React.Component {
  handleClick() {
    this.props.setColorSelected(this.props.color);
  }

  render() {
    const { width, color } = this.props;
    const cellColor = color;

    const styles = {
      paletteColor: {
        width: `${width}%`
      },
      color: {
        backgroundColor: `#${cellColor}`
      }
    };

    return (
      <div
        className={
          `palette-color
          ${this.props.currentColor === cellColor ? 'selected' : ''}`
        }
        style={styles.paletteColor}
      >
        <div
          className="palette-color__color"
          onClick={() => { this.handleClick(); }}
          style={styles.color}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    currentColor: state.present.get('currentColor')
  };
}
export const PaletteColorContainer = connect(
  mapStateToProps,
  actionCreators
)(PaletteColor);
