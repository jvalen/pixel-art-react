import React from 'react';
import { fromJS } from 'immutable';
import Preview from './Preview';
import {
  getDataFromStorage, removeProjectFromStorage,
  generateExportString, exportedStringToProjectData
} from '../utils/storage';

/*
  Avoid error when server-side render doesn't recognize
  localstorage (browser feature)
*/
const browserStorage = (typeof localStorage === 'undefined') ? null : localStorage;

export default class LoadDrawing extends React.Component {
  getExportCode() {
    const projectData = {
      frames: this.props.frames,
      paletteGridData: this.props.paletteGridData,
      cellSize: this.props.cellSize,
      columns: this.props.columns,
      rows: this.props.rows,
      animate: this.props.frames.size > 1
    };
    return generateExportString(projectData);
  }

  importProject() {
    const importedProject =
      exportedStringToProjectData(this.importProjectData.value);

    if (importedProject) {
      const {
        frames, paletteGridData, columns, rows, cellSize
      } = importedProject;

      this.props.actions.setDrawing(
        frames,
        paletteGridData,
        cellSize,
        columns,
        rows
      );
      this.props.close();
      this.props.actions.sendNotification('Project successfully imported');
    } else {
      this.props.actions.sendNotification("Sorry, the project couldn't be imported");
    }
  }

  removeFromStorage(key, e) {
    e.stopPropagation();
    if (browserStorage) {
      const removed = removeProjectFromStorage(browserStorage, key);
      if (removed) {
        this.props.actions.sendNotification('Drawing deleted');
        this.props.close();
        this.props.open();
      }
    }
  }

  drawingClick(data) {
    this.props.actions.setDrawing(
      data.frames,
      data.paletteGridData,
      data.cellSize,
      data.columns,
      data.rows
    );
    this.props.close();
  }

  giveMeDrawings() {
    if (browserStorage) {
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
              rows: data.rows,
              id: data.id
            };

            return (
              <div
                key={elem.id}
                onClick={() => { this.drawingClick(elem); }}
                className="load-drawing__drawing"
              >
                <Preview
                  key={elem.id}
                  storedData={elem}
                  activeFrameIndex={0}
                  duration={1}
                />
                <button
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

  giveMeOptions(type) {
    switch (type) {
      case 'import': {
        return (
          <div className="load-drawing">
            <h2>Paste a previously exported code</h2>
            <textarea
              className="load-drawing__import"
              ref={(c) => { this.importProjectData = c; }}
              defaultValue={''}
            />
            <button
              className="import__button"
              onClick={() => { this.importProject(); }}
            >
              IMPORT
            </button>
          </div>
        );
      }
      case 'export': {
        return (
          <div className="load-drawing">
            <h2>Select and copy the following code. Keep it save in a text file</h2>
            <pre className="load-drawing__export">
              {`\n${this.getExportCode()}\n\n`}
            </pre>
          </div>
        );
      }
      default: {
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
  }

  render() {
    return (this.giveMeOptions(this.props.loadType));
  }
}
