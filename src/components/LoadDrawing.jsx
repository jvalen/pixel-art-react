import React from 'react';
import {connect} from 'react-redux';
import * as actionCreators from '../action_creators';
import Modal from 'react-modal';
import {PreviewContainer} from './Preview';

/*
  Avoid error when server-side render doesn't recognize
  localstorage (browser feature)
*/
let browserStorage = (typeof localStorage === 'undefined') ? null : localStorage;

export const LoadDrawing = React.createClass({
  getInitialState: function() {
    return { modalIsOpen: false };
  },
  openModal: function() {
    this.setState({modalIsOpen: true});
  },
  closeModal: function() {
    this.setState({modalIsOpen: false});
  },
  drawingClick: function (data) {
    this.props.setDrawing(data.grid, data.cellSize, data.columns, data.rows);
    this.closeModal();
  },
  giveMeDrawings: function() {
    if (!!browserStorage) {
      let dataStored = browserStorage.getItem('pixel-art-react');
      if (dataStored) {
        dataStored = JSON.parse(dataStored);

        return dataStored.map((data, i) =>
          <PreviewContainer key={i + 1} loadData={data} onClick={this.drawingClick.bind(this, data)} />
        );
      } else {
        return ['Nothing awesome yet...'];
      }
    }
  },
  render: function() {
    const customStyles = {
      content : {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        textAlign: 'center',
        border: '4px solid #C5C5C5'
      },
      h2 : {
        padding: '2em 0',
        fontSize: '1em'
      }
    };
    return (
      <div>
        <button className="load-drawing red" onClick={this.openModal}>LOAD</button>
        <Modal
            isOpen={this.state.modalIsOpen}
            onRequestClose={this.closeModal}
            style={customStyles} >

            <button onClick={this.closeModal}>CLOSE</button>
            <h2 style={customStyles.h2}>Select one of your awesome drawings</h2>
            <div>
              {this.giveMeDrawings()}
            </div>
          </Modal>
        </div>
    );
  }
});

function mapStateToProps(state) {
  return {};
}
export const LoadDrawingContainer = connect(
  mapStateToProps,
  actionCreators
)(LoadDrawing);
