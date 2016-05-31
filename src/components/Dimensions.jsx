import React from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../action_creators';

export class Dimensions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      columnsValue: 20,
      rowsValue: 20,
      cellSizeValue: 10
    };
  }

  handleCellSizeChange(event) {
    const newLocalState = {
      cellSizeValue: event.target.value | 0
    };
    this.setState(newLocalState, function () {
      this.props.setCellSize(this.state.cellSizeValue);
    });
  }

  handleChange(event) {
    let propertyName;
    const newLocalState = {};
    switch (event.target.className) {
      case 'columns':
        propertyName = 'columnsValue';
        break;
      case 'rows':
        propertyName = 'rowsValue';
        break;
      default:
    }

    newLocalState[propertyName] = event.target.value | 0;
    this.setState(newLocalState, function () {
      this.props.setGridDimension(
        this.state.columnsValue, this.state.rowsValue, this.state.cellSizeValue
      );
    });
  }

  render() {
    const { columns, rows, cellSize } = this.props;
    let columnsValue = columns;
    let rowsValue = rows;
    let cellSizeValue = cellSize;

    return (
      <div className="dimensions">
        <div className="dimensions__columns">
          <input
            type="text"
            value={columnsValue}
            onChange={(ev) => { this.handleChange(ev); }}
            className="columns"
            id="dimensions__columns"
          />
        </div>
        <div className="dimensions__rows">
          <input
            type="text"
            value={rowsValue}
            onChange={(ev) => { this.handleChange(ev); }}
            id="dimensions__rows"
          />
        </div>
        <div className="dimensions__cell-size">
          <label htmlFor="dimensions__tile-size">Pixel Size</label>
          <input
            type="text"
            value={cellSizeValue}
            onChange={(ev) => { this.handleCellSizeChange(ev); }}
            id="dimensions__tile-size"
          />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    columns: state.present.get('columns'),
    rows: state.present.get('rows'),
    cellSize: state.present.get('cellSize'),
  };
}
export const DimensionsContainer = connect(
  mapStateToProps,
  actionCreators
)(Dimensions);
