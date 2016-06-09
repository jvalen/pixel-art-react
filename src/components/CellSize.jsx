import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../store/actions/actionCreators';

export class CellSize extends React.Component {
  handleCellSizeChange(event) {
    this.props.actions.setCellSize(event.target.value | 0);
  }

  render() {
    const { cellSize } = this.props;

    return (
      <div className="cell-size">
        <label htmlFor="cell-size__input">
          Pixel Size
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

const mapStateToProps = (state) => ({
  cellSize: state.present.get('cellSize')
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actionCreators, dispatch)
});

const CellSizeContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(CellSize);
export default CellSizeContainer;
