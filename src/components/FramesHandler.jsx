import React from 'react';
import { FrameContainer } from './Frame';
import { Scrollbars } from 'react-custom-scrollbars';
import { connect } from 'react-redux';
import * as actionCreators from '../action_creators';

export class FramesHandler extends React.Component {
  constructor(props) {
    super(props);
    this.state = { newFrame: false };
  }

  onScrollbarUpdate() {
    if (this.state.newFrame) {
      const { scrollbars } = this.refs;
      this.setState({ newFrame: false });
      scrollbars.scrollToRight();
    }
  }

  getFrames() {
    return this.props.frames.map((frameData, index) => {
      return (
        <FrameContainer
          key={index}
          data-id={index}
          frame={frameData}
          columns={this.props.columns}
          rows={this.props.rows}
          active={this.props.activeFrameIndex === index}
        />
      );
    });
  }

  handleClick() {
    this.props.createNewFrame();
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
            ref="scrollbars"
            universal
            autoHeight
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

function mapStateToProps() {
  return {};
}
export const FramesHandlerContainer = connect(
  mapStateToProps,
  actionCreators
)(FramesHandler);
