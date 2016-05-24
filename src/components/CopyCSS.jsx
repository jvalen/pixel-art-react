import React from 'react';
import Modal from 'react-modal';
import { generatePixelDrawCss } from '../utils/helpers';

export class CopyCSS extends React.Component {
  constructor(props) {
    super(props);
    this.state = { modalIsOpen: false };
  }

  generateCSS() {
    const { frames, columns, rows, cellSize, activeFrameIndex } = this.props;

    if (frames.size > 1) {
      // TODO: Show switch
      console.log('Show switch');
      return null;
    }
    // Show info of only one frame
    let cssString = generatePixelDrawCss(
      frames.get(activeFrameIndex),
      columns,
      rows,
      cellSize,
      'string'
    );
    if (!!cssString) {
      cssString = `box-shadow: ${cssString}; `;
      cssString += `height: ${cellSize}px; width: ${cellSize}px;`;
    }
    return cssString;
  }

  openModal() {
    this.setState({ modalIsOpen: true });
  }

  closeModal() {
    this.setState({ modalIsOpen: false });
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
        <button
          style={customStyles.button}
          className="copy-css gray"
          onClick={() => { this.openModal(); }}
        >
          CSS
        </button>
        <Modal
          isOpen={this.state.modalIsOpen}
          onRequestClose={() => { this.closeModal(); }}
          style={customStyles}
        >
          <button onClick={() => { this.closeModal(); }}>CLOSE</button>
          <h2 style={customStyles.h2}>Copy the CSS generated</h2>
          <div style={customStyles.cssBlock}>
            {this.generateCSS()}
          </div>
        </Modal>
      </div>
    );
  }
}
