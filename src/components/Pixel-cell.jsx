import React from 'react';
import {connect} from 'react-redux';
import * as actionCreators from '../action_creators';

export const PixelCell = React.createClass({
  getInitialState: function() {
    return {color: '484747'};
  },
  handleClick: function(event) {
    this.setState({
      color: this.props.currentColor,
      used: true
    });
    this.props.setGridCellValue(this.props.currentColor, true, this.props.id);
  },
  render: function() {
    const { padding, color, width, id } = this.props;
    let selectedColor = this.state.color;

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
      }
    };

    return <div className="cellWrapper" style={styles.cellWrapper}>
        <div className="cell" onClick={this.handleClick} style={styles.cell}></div>
      </div>;
  }
});

function mapStateToProps(state) {
  return {};
}
export const PixelCellContainer = connect(
  mapStateToProps,
  actionCreators
)(PixelCell);
