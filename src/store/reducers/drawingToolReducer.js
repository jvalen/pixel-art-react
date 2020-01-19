import * as types from '../actions/actionTypes';
import { PENCIL, ERASER, EYEDROPPER, MOVE } from './drawingToolStates';

const switchTool = (drawingTool = PENCIL, tool) => {
  if (drawingTool === tool) {
    return PENCIL;
  }
  return tool;
};

const disableTool = (drawingTool, tool) => {
  if (drawingTool === tool) {
    return PENCIL;
  }
  return drawingTool;
};

export default function drawingToolReducer(drawingTool = PENCIL, action) {
  switch (action.type) {
    case types.SET_INITIAL_STATE:
    case types.NEW_PROJECT:
    case types.APPLY_EYEDROPPER:
      return PENCIL;
    case types.SELECT_PALETTE_COLOR:
      return [EYEDROPPER, ERASER, MOVE].reduce(disableTool, drawingTool);
    case types.SWITCH_TOOL:
      return switchTool(drawingTool, action.tool);
    default:
      return drawingTool;
  }
}
