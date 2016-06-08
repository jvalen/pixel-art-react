import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../store/actions/actionCreators';

import ModalReact from 'react-modal';
import RadioSelector from './RadioSelector';
import { PreviewContainer } from './Preview';
import { CopyCSS } from './CopyCSS';
import { LoadDrawingContainer } from './LoadDrawing';
import { DownloadDrawingContainer } from './DownloadDrawing';
import { TwitterFormContainer } from './TwitterForm';

class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      previewType: 'single',
      loadType: 'storage'
    };
    this.changeRadioType = this.changeRadioType.bind(this);
  }

  getModalContent(props) {
    const options = this.generateRadioOptions(props);
    let content;
    let radioOptions = props.type !== 'load' ?
      <div className="modal__preview">
        <RadioSelector
          name="preview-type"
          selected={this.state.previewType}
          change={this.changeRadioType}
          options={options}
        />
        {this.state.previewType !== 'spritesheet' ?
          <div className="modal__preview--wrapper">
            <PreviewContainer
              key="0"
              frames={props.frames}
              columns={props.columns}
              rows={props.rows}
              cellSize={props.type === 'preview' ? props.cellSize : 5}
              activeFrameIndex={props.activeFrameIndex}
              animate={this.state.previewType === 'animation'}
            />
          </div>
        : null
        }
      </div>
      :
      <div className="modal__load">
        <RadioSelector
          name="load-type"
          selected={this.state.loadType}
          change={this.changeRadioType}
          options={options}
        />
      </div>
      ;

    switch (props.type) {
      case 'load':
        content = (
          <LoadDrawingContainer
            loadType={this.state.loadType}
            close={props.close}
            frames={props.frames}
            columns={props.columns}
            rows={props.rows}
            cellSize={props.cellSize}
            paletteGridData={props.paletteGridData}
          />
        );
        break;
      case 'copycss':
        content = (
          <CopyCSS
            frames={props.frames}
            columns={props.columns}
            rows={props.rows}
            cellSize={props.cellSize}
            activeFrameIndex={props.activeFrameIndex}
            animationCode={this.state.previewType !== 'single'}
            duration={props.duration}
          />
        );
        break;
      case 'download':
        content = (<DownloadDrawingContainer
          frames={props.frames}
          activeFrame={props.activeFrame}
          columns={props.columns}
          rows={props.rows}
          cellSize={props.cellSize}
          duration={props.duration}
          downloadType={this.state.previewType}
        />);
        break;
      case 'twitter':
        content = (
          <TwitterFormContainer
            maxChars="113"
            frames={props.frames}
            activeFrame={props.activeFrame}
            columns={props.columns}
            rows={props.rows}
            cellSize={props.cellSize}
            duration={props.duration}
            paletteGridData={props.paletteGridData}
            tweetType={this.state.previewType}
          />
        );
        break;
      default:
    }

    return (
      <div className="modal">
        <button className="close" onClick={() => { props.close(); }}>
          CLOSE
        </button>
        {radioOptions}
        {content}
      </div>
    );
  }

  generateRadioOptions(props) {
    let options;

    if (props.type !== 'load') {
      options = [{
        value: 'single',
        label: 'single'
      }];

      if (props.frames.size > 1) {
        const spritesheetSupport =
        props.type === 'download' ||
        props.type === 'twitter';

        const animationOption = {
          value: 'animation',
          label: spritesheetSupport ? 'GIF' : 'animation'
        };
        options.push(animationOption);

        if (spritesheetSupport) {
          options.push({
            value: 'spritesheet',
            label: 'spritesheet'
          });
        }
      }
    } else {
      options = [
        { value: 'storage', label: 'Stored' },
        { value: 'import', label: 'Import' },
        { value: 'export', label: 'Export' }
      ];
    }

    return options;
  }

  changeRadioType(value, type) {
    const newState = {};
    switch (type) {
      case 'load-type':
        newState.loadType = value;
        break;
      default:
        newState.previewType = value;
    }
    this.setState(newState);
  }

  render() {
    const styles = {
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

    return (
      <ModalReact
        isOpen={this.props.isOpen}
        onRequestClose={() => { this.props.close(); }}
        style={styles.modal}
      >
        {this.getModalContent(this.props)}
      </ModalReact>
    );
  }
}

function mapStateToProps() {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actionCreators, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Modal);
