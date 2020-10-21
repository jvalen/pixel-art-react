import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import tinykeys from 'tinykeys';
import {
  undo,
  redo,
  switchTool,
  changeDimensions
} from '../store/actions/actionCreators';
import {
  MOVE,
  ERASER,
  BUCKET,
  EYEDROPPER,
  COLOR_PICKER
} from '../store/reducers/drawingToolStates';

const KeyBindings = ({ onClick }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    const keyCombinations = {
      '$mod+KeyZ': event => {
        event.preventDefault();
        dispatch(undo());
      },
      '$mod+KeyY': event => {
        event.preventDefault();
        dispatch(redo());
      },
      // prettier-ignore
      'KeyM': event => {
        event.preventDefault();
        dispatch(switchTool(MOVE));
      },
      // prettier-ignore
      'KeyE': event => {
        event.preventDefault();
        dispatch(switchTool(ERASER));
      },
      // prettier-ignore
      'KeyB': event => {
        event.preventDefault();
        dispatch(switchTool(BUCKET));
      },
      // prettier-ignore
      'KeyO': event => {
        event.preventDefault();
        dispatch(switchTool(EYEDROPPER));
      },
      // prettier-ignore
      'KeyP': event => {
        event.preventDefault();
        dispatch(switchTool(COLOR_PICKER));
      },
      '$mod+ArrowRight': event => {
        event.preventDefault();
        dispatch(changeDimensions('columns', 1));
      },
      '$mod+ArrowLeft': event => {
        event.preventDefault();
        dispatch(changeDimensions('columns', -1));
      },
      '$mod+ArrowDown': event => {
        event.preventDefault();
        dispatch(changeDimensions('rows', 1));
      },
      '$mod+ArrowUp': event => {
        event.preventDefault();
        dispatch(changeDimensions('rows', -1));
      }
    };
    const unsubscribe = tinykeys(window, keyCombinations);
    return () => {
      unsubscribe();
    };
  });
  return (
    <button
      type="button"
      className="app__shortcuts-button"
      aria-label="Show keyboard shortcuts"
      onClick={onClick}
    />
  );
};

export default KeyBindings;
