import React from 'react';
import {connect} from 'react-redux';
import * as actionCreators from '../action_creators';

export const PaletteColor = React.createClass({
  handleClick: function(event) {
    this.props.setColorSelected(this.props.color);
  },
  render: function() {
    const { width, color } = this.props;
    let cellColor = color;

    const styles = {
      cellWrapper: {
        display: "inline-block",
        width: `${width}%`,
        padding: "0.1em"
      },
      cell: {
        backgroundColor: '#' + cellColor,
        color: 'white',
        position: "relative",
        width: "100%",
        paddingBottom: "100%"
      }
    };

    if (this.props.currentColor === cellColor) {
      styles.cellWrapper.border = '4px solid white';
    } else {
      styles.cellWrapper.border = 'none';
    }

    return <div className="cellWrapper" style={styles.cellWrapper}>
        <div className="cell" onClick={this.handleClick} style={styles.cell}></div>
      </div>;
  }
});

function mapStateToProps(state) {
  return {
    currentColor: state.present.get('currentColor')
  };
}
export const PaletteColorContainer = connect(
  mapStateToProps,
  actionCreators
)(PaletteColor);
