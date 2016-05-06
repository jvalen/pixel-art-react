import React from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../action_creators';
import Modal from 'react-modal';
import { PreviewContainer } from './Preview';

/*
  Avoid error when server-side render doesn't recognize
  localstorage (browser feature)
*/
const browserStorage = (typeof localStorage === 'undefined') ? null : localStorage;

export class LoadDrawing extends React.Component {
  constructor(props) {
    super(props);
    this.state = { modalIsOpen: false };
  }

  openModal() {
    this.setState({ modalIsOpen: true });
  }

  closeModal() {
    this.setState({ modalIsOpen: false });
  }

  drawingClick(data) {
    this.props.setDrawing(
      data.grid,
      data.paletteGridData,
      data.cellSize,
      data.columns,
      data.rows
    );
    this.closeModal();
  }

  giveMeDrawings() {
    if (!!browserStorage) {
      let dataStored = browserStorage.getItem('pixel-art-react');
      if (dataStored) {
        dataStored = JSON.parse(dataStored);

        if (dataStored.stored.length > 0) {
          return dataStored.stored.map((data, i) => {
            let elem = data;
            elem.cellSize = 5; // Unify cellsize for load preview
            return (
              <PreviewContainer
                key={i + 1}
                id={i}
                loadData={elem}
                onClick={() => { this.drawingClick(elem); }}
              />
            );
          });
        }
        return ['Nothing awesome yet...'];
      }
    }
    throw new Error('Error getting stored drawings');
  }

  render() {
    const customStyles = {
      content: {
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
      h2: {
        padding: '2em 0',
        fontSize: '1em',
        display: 'block'
      },
      drawingsWrapper: {
        height: '20em',
        overflowY: 'scroll'
      }
    };
    return (
      <div>
        <button
          className="load-drawing red"
          onClick={() => { this.openModal(); }}
        >
          LOAD
        </button>
        <Modal
          isOpen={this.state.modalIsOpen}
          onRequestClose={() => { this.closeModal(); }}
          style={customStyles}
        >
          <button onClick={() => { this.closeModal(); }}>CLOSE</button>
          <h2 style={customStyles.h2}>Select one of your awesome drawings</h2>
          <div style={customStyles.drawingsWrapper}>
            {this.giveMeDrawings()}
          </div>
        </Modal>
      </div>
    );
  }
}

function mapStateToProps() {
  return {};
}
export const LoadDrawingContainer = connect(
  mapStateToProps,
  actionCreators
)(LoadDrawing);
