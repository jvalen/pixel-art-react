import React from 'react';
import {connect} from 'react-redux';
import Modal from 'react-modal';
import {generatePixelDrawCss} from '../utils/helpers';

export const CopyCSS = React.createClass({
  getInitialState: function() {
    return { modalIsOpen: false };
  },
  generateCSS: function() {
    const { grid, columns, rows, cellSize } = this.props;
    let cssString = generatePixelDrawCss(grid.toJS(), columns, rows, cellSize);
    if (!!cssString) {
      cssString = cssString.slice(0, -1);
      cssString = 'box-shadow:' + cssString + '; '
      cssString +=  'height: ' + cellSize + 'px; width: ' + cellSize + 'px;';
    }
    return cssString;
  },
  openModal: function() {
    this.setState({modalIsOpen: true});
  },
  closeModal: function() {
    this.setState({modalIsOpen: false});
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
        border: '4px solid #C5C5C5',
        width: '80%'
      },
      h2 : {
        padding: '2em 0',
        fontSize: '1em',
        display: 'block'
      },
      button: {
        width: '80%',
        margin: '1em auto',
        display: 'table'
      },
      cssBlock: {
        overflowY: 'scroll',
        height: '20em',
        backgroundColor: '#313131',
        color: '#ccc',
        padding: '0.5em',
        textAlign: 'left'
      }
    };
    return (
      <div>
        <button style={customStyles.button} className="copy-css gray" onClick={this.openModal}>
          CSS
        </button>
        <Modal
            isOpen={this.state.modalIsOpen}
            onRequestClose={this.closeModal}
            style={customStyles} >

            <button onClick={this.closeModal}>CLOSE</button>
            <h2 style={customStyles.h2}>Copy the CSS generated</h2>
            <div style={customStyles.cssBlock}>
              {this.generateCSS()}
            </div>
          </Modal>
        </div>
    );
  }
});

function mapStateToProps(state) {
  return {
    grid: state.present.get('grid'),
    columns: state.present.get('columns'),
    rows: state.present.get('rows'),
    cellSize: state.present.get('cellSize')
  };
}
export const CopyCSSContainer = connect(
  mapStateToProps
)(CopyCSS);
