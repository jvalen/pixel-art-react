import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Scrollbars } from 'react-custom-scrollbars';
import * as actionCreators from '../store/actions/actionCreators';
import Frame from './Frame';

class FramesHandler extends React.Component {
  constructor(props) {
    super(props);
    this.state = { newFrame: false };
  }

  onScrollbarUpdate() {
    if (this.state.newFrame) {
      this.setState({ newFrame: false });
      this.scrollbars.scrollToRight();
    }
  }

  getFrames() {
    return this.props.frames.map((frameData, index) =>
      <Frame
        key={frameData.get('key')}
        data-id={index}
        frame={frameData}
        columns={this.props.columns}
        rows={this.props.rows}
        active={this.props.activeFrameIndex === index}
        lastFrame={this.props.frames.size - 1 === index}
        actions={{
          changeActiveFrame: this.props.actions.changeActiveFrame,
          deleteFrame: this.props.actions.deleteFrame,
          duplicateFrame: this.props.actions.duplicateFrame,
          changeFrameInterval: this.props.actions.changeFrameInterval
        }}
      />
    );
  }

  handleClick() {
    this.props.actions.createNewFrame();
    this.setState({ newFrame: true });
  }


  render() {
    return (
      <div className="frames-handler">
        <button
          className="frames-handler__add"
          onClick={() => { this.handleClick(); }}
        >
          +
        </button>
        <div className="frame-handler__list">
          <Scrollbars
            autoHeight
            ref={(c) => { this.scrollbars = c; }}
            universal
            onUpdate={() => { this.onScrollbarUpdate(); }}
          >
            <div className="list__container">
              {this.getFrames()}
            </div>
          </Scrollbars>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  frames: state.present.get('frames'),
  columns: state.present.get('columns'),
  rows: state.present.get('rows'),
  activeFrameIndex: state.present.get('activeFrameIndex')
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actionCreators, dispatch)
});

const FramesHandlerContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(FramesHandler);
export default FramesHandlerContainer;
