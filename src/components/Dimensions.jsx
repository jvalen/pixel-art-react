import React from 'react';
import {connect} from 'react-redux';
import * as actionCreators from '../action_creators';

export const Dimensions = React.createClass({
  getInitialState: function() {
    return {columnsValue: 10, rowsValue: 10};
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
    }

    newLocalState[propertyName] = event.target.value | 0;
    this.setState(newLocalState, function(){
      this.props.setGridDimension(
        this.state.columnsValue, this.state.rowsValue
      );
    });
  },
  render: function() {
    const { columns, rows } = this.props;
    let columnsValue = columns;
    let rowsValue = rows;

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
        fontSize: '1.4em',
        marginBottom: '0.3em',
        color: '#BBBBBB'
      },
      rowsLabel: {
        width: '48%',
        float: 'right',
        textAlign: 'center',
        fontSize: '1.4em',
        marginBottom: '0.3em',
        color: '#BBBBBB'
      }
    };

    return <div className="dimensions self_clear">
        <div style={styles.columnsLabel}>Columns</div>
        <div style={styles.rowsLabel}>Rows</div>
        <input type="text" className="columns" value={columnsValue} onChange={this.handleChange} />
        <input type="text" className="rows" value={rowsValue} onChange={this.handleChange}/>
        <button style={styles.undo} onClick={() => this.props.undo()}>UNDO</button>
        <button style={styles.redo} onClick={() => this.props.redo()}>REDO</button>
      </div>;
  }
});

function mapStateToProps(state) {
  return {
    columns: state.present.get('columns'),
    rows: state.present.get('rows')
  };
}
export const DimensionsContainer = connect(
  mapStateToProps,
  actionCreators
)(Dimensions);
