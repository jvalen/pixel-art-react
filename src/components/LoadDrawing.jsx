import React from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../action_creators';
import { PreviewContainer } from './Preview';
import { fromJS } from 'immutable';

/*
  Avoid error when server-side render doesn't recognize
  localstorage (browser feature)
*/
const browserStorage = (typeof localStorage === 'undefined') ? null : localStorage;

export class LoadDrawing extends React.Component {
  removeFromStorage(key, e) {
    e.stopPropagation();
    if (!!browserStorage) {
      let dataStored = browserStorage.getItem('pixel-art-react');
      if (dataStored) {
        dataStored = JSON.parse(dataStored);
        dataStored.stored.splice(key, 1);
        browserStorage.setItem('pixel-art-react', JSON.stringify(dataStored));
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
      let dataStored = browserStorage.getItem('pixel-art-react');
      if (dataStored) {
        dataStored = JSON.parse(dataStored);

        if (dataStored.stored.length > 0) {
          const styles = {
            delete: {
              position: 'absolute',
              fontSize: '1.7em',
              color: 'red',
              top: 0,
              right: 0,
              cursor: 'no-drop',
              padding: '0.1em',
              backgroundColor: 'white',
              border: '1px solid black'
            },
            wrapper: {
              position: 'relative',
              border: '3px solid black',
              cursor: 'pointer',
              flex: '1 1 25%',
              minHeight: 200,
              margin: '1em'
            }
          };

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
                style={styles.wrapper}
                onClick={() => { this.drawingClick(elem); }}
              >
                <PreviewContainer
                  key={i + 1}
                  id={i}
                  loadData={elem}
                  activeFrameIndex={0}
                />
                <div
                  data-key={i}
                  style={styles.delete}
                  className="fa fa-trash-o"
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
    const customStyles = {
      h2: {
        padding: '2em 0',
        fontSize: '1em',
        display: 'block'
      },
      drawingsWrapper: {
        maxHeight: 400,
        overflowY: 'scroll',
        overflowX: 'hidden',
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap'
      }
    };

    const drawings = this.giveMeDrawings();
    const drawingsStored = drawings.length > 0;
    if (!drawingsStored) {
      customStyles.drawingsWrapper.overflowY = 'hidden';
      customStyles.drawingsWrapper.display = 'block';
    }

    return (
      <div>
        <h2 style={customStyles.h2}>Select one of your awesome drawings</h2>
        <div style={customStyles.drawingsWrapper}>
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
