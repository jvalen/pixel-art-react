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

  const duplicateFrame = () => {
    props.duplicateFrame(props['data-id']);
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
      position: 'relative',
      overflow: 'hidden'
    },
    delete: {
      position: 'absolute',
      color: 'white',
      top: '0.3em',
      right: '0.3em',
      cursor: 'no-drop',
      backgroundColor: '#060606',
      border: '1px solid white',
      padding: '0.1em',
      fontSize: '1.2em'
    },
    duplicate: {
      position: 'absolute',
      color: 'white',
      bottom: '0.3em',
      right: '0.3em',
      cursor: 'copy',
      backgroundColor: '#060606',
      border: '1px solid white',
      padding: '0.1em'
    }
  };

  return (
    <div
      className="frame"
      style={styles.frame}
    >
      <PreviewContainer
        frames={[props.frame]}
        columns={props.columns}
        rows={props.rows}
        cellSize={2}
        activeFrameIndex={0}
        onClick={() => { handleClick(); }}
      />
      <div
        style={styles.delete}
        className="fa fa-trash-o"
        onClick={deleteFrame}
      />
      <div
        style={styles.duplicate}
        className="fa fa-files-o"
        onClick={duplicateFrame}
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
