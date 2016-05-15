import React from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../action_creators';
import { PreviewContainer } from './Preview';

export const Frame = (props) => {
  const handleClick = () => {
    props.changeActiveFrame(props['data-id']);
  };

  const deleteFrame = () => {
    props.deleteFrame(props['data-id']);
  };

  const styles = {
    frame: {
      border: '1px solid #313131',
      backgroundColor: '#BBBBBB',
      color: 'white',
      width: 70,
      height: 70,
      margin: '0 0.3em',
      flex: '0 0 auto',
      position: 'relative'
    },
    delete: {
      position: 'absolute',
      color: 'red',
      top: '0.3em',
      right: '0.3em',
      cursor: 'no-drop'
    }
  };

  return (
    <div
      className="frame"
      style={styles.frame}
    >
      <div
        style={styles.delete}
        className="fa fa-trash-o"
        onClick={deleteFrame}
      />
      <PreviewContainer
        frames={[props.frame]}
        columns={props.columns}
        rows={props.rows}
        cellSize={2}
        activeFrameIndex={0}
        onClick={() => { handleClick(); }}
      />
    </div>
  );
};

function mapStateToProps() {
  return {};
}
export const FrameContainer = connect(
  mapStateToProps,
  actionCreators
)(Frame);
