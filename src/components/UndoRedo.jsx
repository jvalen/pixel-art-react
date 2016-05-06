import React from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../action_creators';

export class UndoRedo extends React.Component {
  undo() {
    this.props.undo();
  }

  redo() {
    this.props.redo();
  }
  render() {
    const styles = {
      undo: {
        width: '48%',
        float: 'left'
      },
      redo: {
        width: '48%',
        float: 'right'
      }
    };

    return (
      <div className="self_clear">
        <button
          className="gray"
          style={styles.undo}
          onClick={() => { this.undo(); }}
        >
          <span className="fa fa-undo"></span>
        </button>
        <button
          className="gray"
          style={styles.redo}
          onClick={() => { this.redo(); }}
        >
          <span className="fa fa-repeat"></span>
        </button>
      </div>
    );
  }
}

export const UndoRedoContainer = connect(
  null,
  actionCreators
)(UndoRedo);
