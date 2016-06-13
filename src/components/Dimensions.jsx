import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../store/actions/actionCreators';

class Dimensions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      columnsValue: 20,
      rowsValue: 20
    };
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
      this.props.actions.setGridDimension(
        this.state.columnsValue, this.state.rowsValue
      );
    });
  }

  render() {
    const { columns, rows } = this.props;

    return (
      <div className="dimensions">
        <div className="dimensions__columns">
          <label htmlFor="dimensions__columns"></label>
          <input
            type="number"
            value={columns}
            onChange={(ev) => { this.handleChange(ev); }}
            className="columns"
            id="dimensions__columns"
          />
        </div>
        <div className="dimensions__rows">
          <label htmlFor="dimensions__rows"></label>
          <input
            type="number"
            value={rows}
            onChange={(ev) => { this.handleChange(ev); }}
            className="rows"
            id="dimensions__rows"
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  columns: state.present.get('columns'),
  rows: state.present.get('rows')
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actionCreators, dispatch)
});

const DimensionsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Dimensions);
export default DimensionsContainer;
