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
    return (
      <div className="undo-redo">
        <button
          onClick={() => { this.undo(); }}
        >
          <span className="undo-redo__icon--undo"></span>
        </button>
        <button
          onClick={() => { this.redo(); }}
        >
          <span className="undo-redo__icon--redo"></span>
        </button>
      </div>
    );
  }
}

export const UndoRedoContainer = connect(
  null,
  actionCreators
)(UndoRedo);
