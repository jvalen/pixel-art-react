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

    newLocalState[propertyName] = event.target.value;
    this.setState(newLocalState, function(){
      this.props.setGridDimension(
        this.state.columnsValue, this.state.rowsValue
      );
    });
  },
  render: function() {
    let columnsValue = this.state.columnsValue;
    let rowsValue = this.state.rowsValue;
    const { columns, rows } = this.props;

    const styles = {
      undo: {
        width: '48%',
        float: 'left'
      },
      redo: {
        width: '48%',
        float: 'right'
      }
    };

    return <div className="dimensions">
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
