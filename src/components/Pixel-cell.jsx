import React from 'react';
import {connect} from 'react-redux';
import * as actionCreators from '../action_creators';

export const PixelCell = React.createClass({
  handleClick: function(event) {
    if (this.props.currentColor !== null) {
      //Apply the new color
      this.props.setGridCellValue(
        this.props.currentColor,
        true,
        this.props.id);
    } else {
      //Color removed
      this.props.setGridCellValue(
        this.props.initialColor,
        false,
        this.props.id);
    }
  },
  render: function() {
    const { padding, color, width, id } = this.props;
    let selectedColor = color,
        customCursor = this.props.currentColor === null ?
          'context-menu' : 'cell';

    const styles = {
      cellWrapper: {
        display: "inline-block",
        width: `${width}%`,
        boxSizing: "border-box",
        padding: padding + 'em'
      },
      cell: {
        backgroundColor: '#' + selectedColor,
        color: 'white',
        position: "relative",
        width: "100%",
        paddingBottom: "100%",
        cursor: customCursor
      }
    };

    return <div className="cellWrapper" style={styles.cellWrapper}>
        <div className="cell" onClick={this.handleClick} style={styles.cell}></div>
      </div>;
  }
});

function mapStateToProps(state) {
  return {
    initialColor: state.present.get('initialColor')
  };
}
export const PixelCellContainer = connect(
  mapStateToProps,
  actionCreators
)(PixelCell);
