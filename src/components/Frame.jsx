import React from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../action_creators';
import { PreviewContainer } from './Preview';
import { List } from 'immutable';

export const Frame = (props) => {
  const handleClick = () => {
    props.changeActiveFrame(props['data-id']);
  };

  const deleteFrame = (e) => {
    e.stopPropagation();
    if (props['data-id'] > 0 && props.active) {
      props.deleteFrame(props['data-id']);
    }
  };

  const duplicateFrame = (e) => {
    e.stopPropagation();
    if (props.active) {
      props.duplicateFrame(props['data-id']);
    }
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
      overflow: 'hidden',
      opacity: 0.4
    },
    delete: {
      position: 'absolute',
      color: 'white',
      top: '0.3em',
      right: '0.3em',
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
      backgroundColor: '#060606',
      border: '1px solid white',
      padding: '0.1em'
    }
  };

  if (props.active) {
    styles.frame.border = '2px solid #961818';
    styles.frame.opacity = 1;
    styles.delete.cursor = 'no-drop';
    styles.duplicate.cursor = 'copy';
  }

  return (
    <div
      className="frame"
      style={styles.frame}
      onClick={() => { handleClick(); }}
    >
      <PreviewContainer
        frames={List(props.frame)}
        columns={props.columns}
        rows={props.rows}
        cellSize={2}
        activeFrameIndex={0}
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
