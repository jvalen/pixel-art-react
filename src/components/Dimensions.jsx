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

    const styles = {
      columnsLabel: {
        width: '48%',
        float: 'left',
        textAlign: 'center',
        marginBottom: '0.3em',
        color: '#BBBBBB',
        top: '0.4em',
        position: 'relative'
      },
      rowsLabel: {
        width: '48%',
        float: 'left',
        textAlign: 'center',
        marginBottom: '0.3em',
        color: '#BBBBBB',
        top: '0.4em',
        position: 'relative'
      },
      cellSizeWrapper: {
        color: '#BBBBBB',
        margin: '1em auto',
        textAlign: 'center',
        padding: 0,
        width: '80%',
        display: 'table',
        marginBottom: '2em'
      },
      colWrapper: {
        margin: '1em auto',
        padding: 0,
        width: '80%',
        display: 'table'
      },
      rowWrapper: {
        margin: '1em auto',
        padding: 0,
        width: '80%',
        display: 'table'
      },
      cellSizeLabel: {
        width: '48%',
        float: 'left',
        textAlign: 'center',
        marginBottom: '0.3em',
        color: '#BBBBBB',
        top: 0,
        position: 'relative'
      },
      dimensions: {
        marginTop: '1.5em'
      }
    };

    return (
      <div className="dimensions self_clear" style={styles.dimensions}>
        <div className="column-wrapper self_clear" style={styles.colWrapper}>
          <label style={styles.columnsLabel}>Col</label>
          <input
            type="text"
            className="columns"
            value={columnsValue}
            onChange={(ev) => { this.handleChange(ev); }}
          />
        </div>
        <div className="row-wrapper self_clear" style={styles.rowWrapper}>
          <label style={styles.rowsLabel}>Row</label>
          <input
            type="text"
            className="rows"
            value={rowsValue}
            onChange={(ev) => { this.handleChange(ev); }}
          />
        </div>
        <div className="cell-size-wrapper" style={styles.cellSizeWrapper}>
          <label className="tile-size-label" style={styles.cellSizeLabel}>Tile Size</label>
          <input
            type="text"
            className="cell-size"
            value={cellSizeValue}
            onChange={(ev) => { this.handleCellSizeChange(ev); }}
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
