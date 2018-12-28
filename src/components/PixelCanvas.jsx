import React from 'react';
import { connect } from 'react-redux';
import {
  cellAction,
  updateGridBoundaries
} from '../store/actions/actionCreators';
import GridWrapper from './GridWrapper';
import throttle from '../utils/throttle';
import { ERASER, EYEDROPPER } from '../store/reducers/drawingToolStates';

const gridContainerClass = 'grid-container';

class PixelCanvas extends React.Component {
  constructor(props) {
    super(props);
    this.drawHandlers = props.drawHandlersFactory(this);
  }

  componentDidMount() {
    this.props.updateGridBoundaries();
    window.addEventListener('resize', this.props.updateGridBoundaries);
    window.addEventListener('scroll', this.props.updateGridBoundaries);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.props.updateGridBoundaries);
    window.removeEventListener('scroll', this.props.updateGridBoundaries);
  }

  render() {
    const { props } = this;
    const cells = props.grid.map((color, i) => ({
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
      />
    );
  }
}

const mapStateToProps = state => {
  const frames = state.present.get('frames');
  const activeFrameIndex = frames.get('activeIndex');
  const drawingTool = state.present.get('drawingTool');
  const palette = state.present.get('palette');
  const position = palette.get('position');
  const paletteCellPosition = position === -1 ? 0 : position;
  return {
    grid: frames.getIn(['list', activeFrameIndex, 'grid']),
    columns: frames.get('columns'),
    rows: frames.get('rows'),
    drawingTool,
    paletteColor: palette.getIn(['grid', paletteCellPosition, 'color']),
    eyedropperOn: drawingTool === EYEDROPPER,
    eraserOn: drawingTool === ERASER,
    gridBoundaries: state.present.get('gridBoundaries')
  };
};

const mapDispatchToProps = dispatch => ({
  cellAction: cellProps => dispatch(cellAction(cellProps)),
  updateGridBoundaries: throttle(() => {
    const gridElement = document.getElementsByClassName(gridContainerClass)[0];
    dispatch(updateGridBoundaries(gridElement));
  }, 500)
});

const PixelCanvasContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(PixelCanvas);
export default PixelCanvasContainer;
