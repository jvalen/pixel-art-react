import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../action_creators';

import ModalReact from 'react-modal';
import RadioSelector from './RadioSelector';
import { PreviewContainer } from './Preview';
import { CopyCSS } from './CopyCSS';

class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      previewType: 'single'
    };
    this.changePreviewType = this.changePreviewType.bind(this);
  }

  changePreviewType(value) {
    this.setState({ previewType: value });
  }

  generateRadioOptions(props) {
    const options = [{
      value: 'single',
      label: 'single'
    }];

    if (props.frames.size > 1) {
      const animationOption = {
        value: 'animation',
        label: 'animation'
      };

      switch (props.type) {
        case 'download':
        case 'twitter':
          animationOption.label = 'GIF';
          options.push({
            value: 'spritesheet',
            label: 'spritesheet'
          });
          break;
        default: // copycss || preview
      }
      options.push(animationOption);
    }

    return options;
  }

  getModalContent(props) {
    const options = this.generateRadioOptions(this.props);
    let content;
    let radioOptions = props.type !== 'load' ?
      <div className="modal-preview">
        <RadioSelector
          name="preview-type"
          selected={this.state.previewType}
          change={this.changePreviewType}
          options={options}
        />
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
      :
      null;

    switch (props.type) {
      case 'load':
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
        break;
      case 'twitter':
        break;
      default:
    }

    return (
      <div className="modal-content">
        <button onClick={() => { this.props.close(); }}>
          CLOSE
        </button>
        {radioOptions}
        {content}
      </div>
    );
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
