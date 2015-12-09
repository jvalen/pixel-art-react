import React from 'react';
import {connect} from 'react-redux';
import * as actionCreators from '../action_creators';

export const Dimensions = React.createClass({
  getInitialState: function() {
    return {columnsValue: 3, rowsValue: 3};
  },
  handleChange: function(event) {
    if (event.target.className === 'columns') {
      this.setState({columnsValue: event.target.value});
    } else if (event.target.className === 'rows') {
      this.setState({rowsValue: event.target.value});
    }
  },
  render: function() {
    console.log('********* DIMENSIONS getCells');
    let columnsValue = this.state.columnsValue;
    let rowsValue = this.state.rowsValue;
    console.log(columnsValue + ' ' + rowsValue);
    const { columns, rows } = this.props;

    const styles = {
      textInput: {
        boxSizing: "border-box",
        width: "50%"
      },
      button: {
        width: "100%"
      },
      wrapperInput: {
        width: "50%",
        float: "left"
      }
    };

    return <div className="dimensions" style={styles.wrapperInput}>
        <input style={styles.textInput} type="text" placeholder="Columns" className="columns" value={columnsValue} onChange={this.handleChange} />
        <input style={styles.textInput} type="text" placeholder="Rows" className="rows" value={rowsValue} onChange={this.handleChange}/>
        <button style={styles.button} onClick={() => this.props.setGridDimension(columnsValue, rowsValue)}>New layout</button>
      </div>;
  }
});

function mapStateToProps(state) {
  return {
    columns: state.get('columns'),
    rows: state.get('rows')
  };
}
export const DimensionsContainer = connect(
  mapStateToProps,
  actionCreators
)(Dimensions);
