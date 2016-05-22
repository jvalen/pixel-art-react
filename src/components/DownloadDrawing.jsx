import React from 'react';
import { connect } from 'react-redux';
import { shareDrawing } from '../utils/helpers';
import * as actionCreators from '../action_creators';
import Modal from 'react-modal';
import RadioSelector from './RadioSelector';

export class DownloadDrawing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalIsOpen: false,
      downloadType: 'frame'
    };
    this.changeDownloadType = this.changeDownloadType.bind(this);
  }

  openModal() {
    this.setState({ modalIsOpen: true });
  }

  closeModal() {
    this.setState({ modalIsOpen: false });
  }

  changeDownloadType(value) {
    this.setState({ downloadType: value });
  }

  download(type) {
    const {
      frames,
      activeFrame,
      columns,
      rows,
      cellSize,
      duration
    } = this.props;

    shareDrawing(
      {
        type,
        frames,
        activeFrame,
        columns,
        rows,
        cellSize,
        duration
      },
      '',
      'download'
    );
    this.props.sendNotification('Downloading...');
  }

  render() {
    const styles = {
      wrapper: {
        margin: '0 auto',
        display: 'table'
      },
      modal: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        textAlign: 'center',
        border: '4px solid #C5C5C5'
      }
    };

    const options = [
      {
        value: 'frame',
        label: 'selected frame'
      },
      {
        value: 'gif',
        label: 'gif'
      },
      {
        value: 'spritesheet',
        label: 'spritesheet'
      }
    ];

    return (
      <div style={styles.wrapper}>
        <button
          className="fa fa-download brown"
          onClick={() => { this.openModal(); }}
        />
        <Modal
          isOpen={this.state.modalIsOpen}
          onRequestClose={() => { this.hidePreview(); }}
          style={styles.modal}
        >
          <button
            onClick={() => { this.download(this.state.downloadType); }}
          >
            DOWNLOAD
          </button>
          <button onClick={() => { this.closeModal(); }}>CLOSE</button>
          <RadioSelector
            name="download-type"
            selected={this.state.downloadType}
            change={this.changeDownloadType}
            options={options}
          />
        </Modal>
      </div>
    );
  }
}

function mapStateToProps() {
  return {};
}
export const DownloadDrawingContainer = connect(
  mapStateToProps,
  actionCreators
)(DownloadDrawing);
