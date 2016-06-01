import React from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../action_creators';

export class CellSize extends React.Component {
  handleCellSizeChange(event) {
    this.props.setCellSize(event.target.value | 0);
  }

  render() {
    const { cellSize } = this.props;

    return (
      <div className="cell-size">
        <label
          data-tooltip="Size of one tile in px"
          htmlFor="cell-size__input"
        >
          Pixel Size:
        </label>
        <input
          type="text"
          value={cellSize}
          onChange={(ev) => { this.handleCellSizeChange(ev); }}
          id="cell-size__input"
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    cellSize: state.present.get('cellSize'),
  };
}
export const CellSizeContainer = connect(
  mapStateToProps,
  actionCreators
)(CellSize);
