import React from 'react';
import {connect} from 'react-redux';
import * as actionCreators from '../action_creators';

export const Dimensions = React.createClass({
  getInitialState: function() {
    return {columnsValue: 10, rowsValue: 10, cellSizeValue: 10};
  },
  handleChange: function(event) {
    let propertyName, newLocalState = {};
    switch (event.target.className) {
      case 'columns':
        propertyName = 'columnsValue';
        break;
      case 'rows':
        propertyName = 'rowsValue';
        break;
      case 'cell-size':
        propertyName = 'cellSizeValue';
        break;
    }

    newLocalState[propertyName] = event.target.value | 0;
    this.setState(newLocalState, function() {
      this.props.setGridDimension(
        this.state.columnsValue, this.state.rowsValue, this.state.cellSizeValue
      );
    });
  },
  render: function() {
    const { columns, rows, cellSize } = this.props;
    let columnsValue = columns;
    let rowsValue = rows;
    let cellSizeValue = cellSize;

    const styles = {
      undo: {
        width: '48%',
        float: 'left'
      },
      redo: {
        width: '48%',
        float: 'right'
      },
      columnsLabel: {
        width: '48%',
        float: 'left',
        textAlign: 'center',
        marginBottom: '0.3em',
        color: '#BBBBBB'
      },
      rowsLabel: {
        width: '48%',
        float: 'right',
        textAlign: 'center',
        marginBottom: '0.3em',
        color: '#BBBBBB'
      },
      cellSizeWrapper: {
        color: '#BBBBBB',
        margin: '1em 0',
        textAlign: 'center'
      }
    };

    return <div className="dimensions self_clear">
        <div style={styles.columnsLabel}>Col</div>
        <div style={styles.rowsLabel}>Row</div>
        <input type="text" className="columns" value={columnsValue} onChange={this.handleChange} />
        <input type="text" className="rows" value={rowsValue} onChange={this.handleChange}/>
        <div className="cell-size-wrapper" style={styles.cellSizeWrapper}>
          <div style={styles.cellSizeLabel}>Tile Size</div>
          <input type="text" className="cell-size" value={cellSizeValue} onChange={this.handleChange}/>
        </div>
        <button style={styles.undo} onClick={() => this.props.undo()}>UNDO</button>
        <button style={styles.redo} onClick={() => this.props.redo()}>REDO</button>
      </div>;
  }
});

function mapStateToProps(state) {
  return {
    columns: state.present.get('columns'),
    rows: state.present.get('rows'),
    cellSize: state.present.get('cellSize')
  };
}
export const DimensionsContainer = connect(
  mapStateToProps,
  actionCreators
)(Dimensions);
