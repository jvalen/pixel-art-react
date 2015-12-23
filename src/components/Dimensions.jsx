import React from 'react';
import {connect} from 'react-redux';
import * as actionCreators from '../action_creators';
import Modal from 'react-modal';
import {PreviewContainer} from './Preview';

export const Dimensions = React.createClass({
  getInitialState: function() {
    return {columnsValue: 10, rowsValue: 10, cellSizeValue: 10, modalIsOpen: false};
  },
  showPreview: function() {
    this.setState({modalIsOpen: true});
  },
  hidePreview: function() {
    this.setState({modalIsOpen: false});
  },
  handleCellSizeChange: function(event) {
    let newLocalState = {
      cellSizeValue: event.target.value | 0
    };
    this.setState(newLocalState, function() {
      this.props.setCellSize(this.state.cellSizeValue);
    });
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
      },
      cellSizeLabel: {
        marginBottom: '0.3em'
      },
      modal : {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        textAlign: 'center',
        border: '4px solid #C5C5C5'
      },
      showPreviewWrapper: {
        margin: '1em 0'
      },
      showPreviewButton: {
        width: '100%'
      }
    };

    return <div className="dimensions self_clear">
        <div style={styles.columnsLabel}>Col</div>
        <div style={styles.rowsLabel}>Row</div>
        <input type="text" className="columns" value={columnsValue} onChange={this.handleChange} />
        <input type="text" className="rows" value={rowsValue} onChange={this.handleChange}/>
        <div className="cell-size-wrapper" style={styles.cellSizeWrapper}>
          <div style={styles.cellSizeLabel}>Tile Size</div>
          <input type="text" className="cell-size" value={cellSizeValue} onChange={this.handleCellSizeChange}/>
        </div>
        <div className="self_clear">
          <button style={styles.undo} onClick={() => this.props.undo()}>UNDO</button>
          <button style={styles.redo} onClick={() => this.props.redo()}>REDO</button>
        </div>
        <div className="show-preview-wrapper" style={styles.showPreviewWrapper}>
          <button style={styles.showPreviewButton} onClick={this.showPreview}>Preview</button>
          <Modal
            isOpen={this.state.modalIsOpen}
            onRequestClose={this.hidePreview}
            style={styles.modal} >

            <button onClick={this.hidePreview}>CLOSE</button>
            <div>
              <PreviewContainer key="0" />
            </div>
          </Modal>
        </div>
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
