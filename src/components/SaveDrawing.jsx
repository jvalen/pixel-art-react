import React from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../action_creators';
import { saveProjectToStorage } from '../utils/storage';

export class SaveDrawing extends React.Component {
  save() {
    const drawingToSave = {
      frames: this.props.frames,
      paletteGridData: this.props.paletteGridData,
      cellSize: this.props.cellSize,
      columns: this.props.columns,
      rows: this.props.rows,
      animate: this.props.frames.size > 1
    };

    if (saveProjectToStorage(localStorage, drawingToSave)) {
      this.props.sendNotification('Drawing saved');
    }
  }
  render() {
    return (
      <div className="save-drawing">
        <button
          onClick={() => { this.save(); }}
        >
          SAVE
        </button>
      </div>
    );
  }
}

function mapStateToProps() {
  return {};
}
export const SaveDrawingContainer = connect(
  mapStateToProps,
  actionCreators
)(SaveDrawing);
