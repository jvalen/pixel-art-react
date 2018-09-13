import React from 'react';
import { connect } from 'react-redux';

import { startToDrag, mouseOver, drop } from '../store/actions/actionCreators';

const mapDispatchToProps = (dispatch, props) => ({
  onMouseDown: (ev) => {
    ev.preventDefault();
    dispatch(startToDrag(props.id));
  },
  onMouseUp: (ev) => {
    ev.preventDefault();
    dispatch(drop());
  },
  onMouseOver: (ev) => {
    ev.preventDefault();
    dispatch(mouseOver(props.id));
  },
  onTouchMove: (ev) => {
    /*
      TODO: It should draw the every cell we are moving over
      like is done in handleMouseOver. But is not working due
      to the nature of the touch events.

      The target element in a touch event is always the one
      when the touch started, not the element under the cursor
      (like the mouse event behaviour)
    */
    ev.preventDefault();
    dispatch(mouseOver(props.id));
  }
});

const GRID_INITIAL_COLOR = '#313131';

class PixelCell extends React.Component {
  shouldComponentUpdate(nextProps) {
    const keys = ['color', 'width'];
    const isSame = keys.every(key => this.props.cell[key] === nextProps.cell[key]);
    return !isSame;
  }
  render() {
    const { props } = this;
    const {
      cell: { color, width }
    } = props;
    const styles = {
      width: `${width}%`,
      paddingBottom: `${width}%`,
      backgroundColor: color || GRID_INITIAL_COLOR
    };

    return (
      <div
        onMouseDown={props.onMouseDown}
        onMouseUp={props.onMouseUp}
        onMouseOver={props.onMouseOver}
        onFocus={props.onMouseOver}
        onTouchStart={props.onMouseDown}
        onTouchEnd={props.onMouseUp}
        onTouchCancel={props.onMouseUp}
        onTouchMove={props.onTouchMove}
        style={styles}
      />
    );
  }
}

export default connect(
  null,
  mapDispatchToProps
)(PixelCell);
