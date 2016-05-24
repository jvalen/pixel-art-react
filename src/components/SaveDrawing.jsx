import React from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../action_creators';

export class SaveDrawing extends React.Component {
  save() {
    let dataStored = localStorage.getItem('pixel-art-react');
    const { frames, columns, rows, cellSize, paletteGridData } = this.props;
    const drawingToSave = {
      id: 0,
      frames: frames.toJS(),
      paletteGridData,
      cellSize,
      columns,
      rows,
      animate: frames.size > 1
    };

    if (dataStored) {
      // Data exist in the web storage
      dataStored = JSON.parse(dataStored);

      const drawingsCount = dataStored.length;
      drawingToSave.id = drawingsCount;
      dataStored.stored.push(drawingToSave);
    } else {
      // No data in the web storage
      dataStored = {
        stored: [drawingToSave],
        current: null
      };
    }

    localStorage.setItem('pixel-art-react', JSON.stringify(dataStored));

    this.props.sendNotification('Drawing saved');
  }
  render() {
    return (
      <div>
        <button
          className="save-drawing red"
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
