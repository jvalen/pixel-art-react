import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import tinykeys from 'tinykeys';
import { undo, redo } from '../store/actions/actionCreators';

const KeyBindings = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const unsubscribe = tinykeys(window, {
      '$mod+KeyZ': event => {
        event.preventDefault();
        dispatch(undo());
      },
      '$mod+KeyY': event => {
        event.preventDefault();
        dispatch(redo());
      }
    });
    return () => {
      unsubscribe();
    };
  });
  return null;
};

export default KeyBindings;
