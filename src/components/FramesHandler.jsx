import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { Scrollbars } from 'react-custom-scrollbars';
import * as actionCreators from '../store/actions/actionCreators';
import Frame from './Frame';

class FramesHandler extends React.Component {
  constructor(props) {
    super(props);
    this.state = { newFrame: false };
    this.onDragEnd = this.onDragEnd.bind(this);
  }

  handleClick() {
    const { actions } = this.props;
    actions.createNewFrame();
    this.setState({ newFrame: true });
  }

  onDragEnd(result) {
    const { destination, source } = result;
    const { actions } = this.props;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    actions.reorderFrame(source.index, destination.index);
  }

  onScrollbarUpdate() {
    const { newFrame } = this.state;
    if (newFrame) {
      this.setState({ newFrame: false });
      this.scrollbars.scrollToRight();
    }
  }

  getFrames() {
    const { list, columns, rows, activeIndex, actions } = this.props;
    return list.map((frameData, index) => (
      <Frame
        key={frameData.get('key')}
        dataId={index}
        frame={frameData}
        columns={columns}
        rows={rows}
        active={activeIndex === index}
        lastFrame={list.size - 1 === index}
        actions={{
          changeActiveFrame: actions.changeActiveFrame,
          deleteFrame: actions.deleteFrame,
          duplicateFrame: actions.duplicateFrame,
          changeFrameInterval: actions.changeFrameInterval
        }}
      />
    ));
  }

  render() {
    return (
      <div className="frames-handler">
        <button
          type="button"
          className="frames-handler__add"
          onClick={() => {
            this.handleClick();
          }}
        >
          +
        </button>
        <div className="frame-handler__list">
          <Scrollbars
            autoHeight
            ref={c => {
              this.scrollbars = c;
            }}
            universal
            onUpdate={() => {
              this.onScrollbarUpdate();
            }}
          >
            <DragDropContext onDragEnd={this.onDragEnd}>
              <Droppable droppableId="droppable" direction="horizontal">
                {provided => (
                  <div
                    className="list__container"
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    {this.getFrames()}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          </Scrollbars>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => state.present.get('frames').toObject();

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actionCreators, dispatch)
});

const FramesHandlerContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(FramesHandler);
export default FramesHandlerContainer;
