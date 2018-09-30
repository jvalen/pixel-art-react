import { Map } from 'immutable';

export function init() {
  return Map({
    eraserOn: false,
    eyedropperOn: false,
    colorPickerOn: false,
    bucketOn: false,
  });
}

export function reset(drawingTools) {
  return drawingTools.merge({
    eraserOn: false,
    eyedropperOn: false,
    colorPickerOn: false,
  });
}

export function switchOnEraser() {
  return Map({
    eraserOn: true,
    eyedropperOn: false,
    colorPickerOn: false,
    bucketOn: false,
  });
}

export function switchBucket(drawingTools) {
  return Map({
    eraserOn: false,
    eyedropperOn: false,
    colorPickerOn: false,
    bucketOn: !drawingTools.get('bucketOn'),
  });
}

export function switchOnEyedropper() {
  return Map({
    eraserOn: false,
    eyedropperOn: true,
    colorPickerOn: false,
    bucketOn: false,
  });
}

export function switchOnColorPicker() {
  return Map({
    eraserOn: false,
    eyedropperOn: false,
    colorPickerOn: true,
    bucketOn: false,
  });
}
