import React from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../action_creators';
import { PreviewContainer } from './Preview';
import { fromJS } from 'immutable';
import { getDataFromStorage, removeProjectFromStorage } from '../utils/storage';

/*
  Avoid error when server-side render doesn't recognize
  localstorage (browser feature)
*/
const browserStorage = (typeof localStorage === 'undefined') ? null : localStorage;

export class LoadDrawing extends React.Component {
  removeFromStorage(key, e) {
    e.stopPropagation();
    if (!!browserStorage) {
      const removed = removeProjectFromStorage(browserStorage, key);
      if (removed) {
        this.props.sendNotification('Drawing deleted');
        this.props.close();
      }
    }
  }

  drawingClick(data) {
    this.props.setDrawing(
      data.frames,
      data.paletteGridData,
      data.cellSize,
      data.columns,
      data.rows
    );
    this.props.close();
  }

  giveMeDrawings() {
    if (!!browserStorage) {
      const dataStored = getDataFromStorage(browserStorage);
      if (dataStored) {
        if (dataStored.stored.length > 0) {
          return dataStored.stored.map((data, i) => {
            const elem = {
              animate: data.animate,
              cellSize: 5, // Unify cellsize for load preview
              columns: data.columns,
              frames: fromJS(data.frames), // Parse to immutable
              paletteGridData: fromJS(data.paletteGridData),
              rows: data.rows
            };

            return (
              <div
                key={i}
                onClick={() => { this.drawingClick(elem); }}
                className="load-drawing__drawing"
              >
                <PreviewContainer
                  key={i + 1}
                  id={i}
                  loadData={elem}
                  activeFrameIndex={0}
                />
                <div
                  data-key={i}
                  className="drawing__delete"
                  onClick={(event) => { this.removeFromStorage(i, event); }}
                />
              </div>
            );
          });
        }
      }
    }
    return [];
  }

  render() {
    const drawings = this.giveMeDrawings();
    const drawingsStored = drawings.length > 0;

    return (
      <div className="load-drawing">
        <h2>Select one of your awesome drawings</h2>
        <div
          className={
            `load-drawing__container
            ${!drawingsStored ? 'empty' : ''}`}
        >
          {drawingsStored ? this.giveMeDrawings() : 'Nothing awesome yet...'}
        </div>
      </div>
    );
  }
}

function mapStateToProps() {
  return {};
}
export const LoadDrawingContainer = connect(
  mapStateToProps,
  actionCreators
)(LoadDrawing);
