import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import shortid from 'shortid';
import * as actionCreators from '../store/actions/actionCreators';
import { saveProjectToStorage } from '../utils/storage';

const SaveDrawing = props => {
  const save = () => {
    const drawingToSave = {
      frames: props.frames,
      paletteGridData: props.paletteGridData,
      cellSize: props.cellSize,
      columns: props.columns,
      rows: props.rows,
      animate: props.frames.size > 1,
      id: shortid.generate()
    };

    if (saveProjectToStorage(localStorage, drawingToSave)) {
      props.actions.sendNotification('Drawing saved');
    }
  };

  return (
    <div className="save-drawing">
      <button
        type="button"
        onClick={() => {
          save();
        }}
      >
        SAVE
      </button>
    </div>
  );
};

const mapStateToProps = state => {
  const frames = state.present.get('frames');
  return {
    frames: frames.get('list'),
    columns: frames.get('columns'),
    rows: frames.get('rows'),
    cellSize: state.present.get('cellSize'),
    paletteGridData: state.present.getIn(['palette', 'grid'])
  };
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actionCreators, dispatch)
});

const SaveDrawingContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SaveDrawing);
export default SaveDrawingContainer;
