import React from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../actions/actionCreators';

export class Dimensions extends React.Component {
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
      this.props.setGridDimension(
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
            type="text"
            value={columns}
            onChange={(ev) => { this.handleChange(ev); }}
            className="columns"
            id="dimensions__columns"
          />
        </div>
        <div className="dimensions__rows">
          <label htmlFor="dimensions__rows"></label>
          <input
            type="text"
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
