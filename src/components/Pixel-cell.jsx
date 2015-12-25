import React from 'react';
import {connect} from 'react-redux';
import * as actionCreators from '../action_creators';

export const PixelCell = React.createClass({
  handleClick: function(event) {
    if (!this.props.eraserOn && !this.props.eyedropperOn) {
      //Apply the new color
      this.props.setGridCellValue(
        this.props.currentColor,
        true,
        this.props.id);
    } else if(this.props.eraserOn) {
      //Color removed
      this.props.setGridCellValue(
        this.props.initialColor,
        false,
        this.props.id);
    } else if(this.props.eyedropperOn) {
      //Eyedropper
      this.props.setColorSelected(this.props.color);
    }
  },
  render: function() {
    const { padding, color, width, id } = this.props;
    let selectedColor = color,
        customCursor = 'cell';

    if (this.props.eraserOn) {
      customCursor = 'context-menu';
    } else if(this.props.eyedropperOn) {
      customCursor = 'copy';
    }

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
    initialColor: state.present.get('initialColor'),
    eyedropperOn: state.present.get('eyedropperOn'),
    eraserOn: state.present.get('eraserOn')
  };
}
export const PixelCellContainer = connect(
  mapStateToProps,
  actionCreators
)(PixelCell);
