import React from 'react';
import {connect} from 'react-redux';
import * as actionCreators from '../action_creators';

export const Reset = React.createClass({
  handleClick: function(event) {
    this.props.resetGrid(this.props.columns, this.props.rows);
  },
  render: function() {
    const style = {
      width: '80%',
      margin: '0.5em auto',
      display: 'table'
    };
    return (
      <button className="gray" style={style} onClick={this.handleClick}>RESET</button>
    );
  }
});

function mapStateToProps(state) {
  return {
    columns: state.present.get('columns'),
    rows: state.present.get('rows')
  };
}
export const ResetContainer = connect(
  mapStateToProps,
  actionCreators
)(Reset);
