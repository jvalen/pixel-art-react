import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../store/actions/actionCreators';
import GridWrapper from './GridWrapper';
import throttle from '../utils/throttle';

const gridContainerClass = 'grid-container';

class PixelCanvas extends React.Component {
  constructor(props) {
    super(props);
    const onCellEvent = id => props.actions.drawCell(id);
    this.drawHandlers = props.drawHandlersFactory(onCellEvent);
    this.updateBoundingRectangle = throttle(this.updateBoundingRectangle.bind(this), 500);
    this.state = {
      boundingRectangle: {}
    };
  }

  componentDidMount() {
    this.updateBoundingRectangle();
    window.addEventListener('resize', this.updateBoundingRectangle);
    window.addEventListener('scroll', this.updateBoundingRectangle);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateBoundingRectangle);
    window.removeEventListener('scroll', this.updateBoundingRectangle);
  }

  updateBoundingRectangle() {
    const pixelGridElement = document.getElementsByClassName(gridContainerClass)[0];
    this.setState({
      boundingRectangle: pixelGridElement.getBoundingClientRect()
    });
  }

  fromEventToId(ev) {
    const [{
      radiusX, radiusY, clientX, clientY
    }] = ev.targetTouches;
    const {
      state: {
        boundingRectangle: {
          x, y, width, height
        }
      },
      props: { columns, activeFrame }
    } = this;
    const posX = Math.round(((clientX - x - radiusX) * columns) / width);
    const posY = Math.round(((clientY - y - radiusY) * columns) / height);
    const id = posX < 0 || posY < 0 ? null : posX + (columns * posY);
    return id !== null && id < activeFrame.get('grid').size ? id : null;
  }

  render() {
    const { props } = this;
    const cells = props.activeFrame.get('grid').map((color, i) => ({
      id: i,
      width: 100 / props.columns,
      color
    }));

    let gridExtraClass = 'cell';
    if (props.eraserOn) {
      gridExtraClass = 'context-menu';
    } else if (props.eyedropperOn) {
      gridExtraClass = 'copy';
    }

    return (
      <GridWrapper
        cells={cells}
        classes={`${gridContainerClass} ${gridExtraClass}`}
        drawHandlers={this.drawHandlers}
        onTouchMove={ev => this.drawHandlers.onTouchMove(this.fromEventToId(ev), ev)}
      />
    );
  }
}

const mapStateToProps = (state) => {
  const frames = state.present.get('frames');
  const activeFrameIndex = state.present.get('activeFrameIndex');
  return {
    activeFrame: frames.get(activeFrameIndex),
    columns: state.present.get('columns'),
    eyedropperOn: state.present.get('eyedropperOn'),
    eraserOn: state.present.get('eraserOn')
  };
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actionCreators, dispatch)
});

const PixelCanvasContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(PixelCanvas);
export default PixelCanvasContainer;
