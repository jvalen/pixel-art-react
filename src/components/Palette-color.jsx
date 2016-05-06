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
      cellWrapper: {
        display: 'inline-block',
        width: `${width}%`
      },
      cell: {
        backgroundColor: `#${cellColor}`,
        color: 'white',
        position: 'relative',
        width: '100%',
        paddingBottom: '100%'
      }
    };

    if (this.props.currentColor === cellColor) {
      styles.cellWrapper.border = '4px solid white';
    } else {
      styles.cellWrapper.border = 'none';
    }

    return (
      <div className="cellWrapper" style={styles.cellWrapper}>
        <div
          className="cell"
          onClick={() => { this.handleClick(); }}
          style={styles.cell}
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
