import React from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../store/actions/actionCreators';

export class Reset extends React.Component {
  handleClick() {
    this.props.resetGrid(
      this.props.columns,
      this.props.rows,
      this.props.activeFrameIndex);
  }

  render() {
    return (
      <button
        className="reset"
        onClick={() => { this.handleClick(); }}
      >
        RESET
      </button>
    );
  }
}

function mapStateToProps() {
  return {};
}
export const ResetContainer = connect(
  mapStateToProps,
  actionCreators
)(Reset);
