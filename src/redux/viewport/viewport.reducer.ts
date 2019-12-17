import { createReducer } from "../utils";
import { SET_VIEWPORT_POS, SET_VIEWPORT_ZOOM, START_PANNING, STOP_PANNING } from "./viewport.actions";
import { IViewportState } from "./viewport.types";

const INITIAL_STATE = {
  xPos: 0,
  yPos: 0,
  zoom: 1,
  settings: {
    canPan: true,
    canZoom: true,
    zoomSpeed: 6,
    minZoom: 0.5,
    maxZoom: 1.7,
    padding: 20,
  },
};

/** given a zoom action, update the zoom if within boundaries
 * @param state
 * @param action
 */
function zoomHandler(state: IViewportState, action: any): IViewportState {
  const { zoom, x, y } = action.payload;
  return {
    ...state,
    zoom,
    xPos: x,
    yPos: y,
  };
}

/** given an action to pan, update the viewport location if within bounds
 * @param state
 * @param action
 */
function panHandler(state: IViewportState, action: any): IViewportState {
  const { x, y } = action.payload;
  return {
    ...state,
    xPos: x,
    yPos: y,
  };
}

/** initialize panning
 * @param state
 * @param action
 */
function panStartHandler(state: IViewportState, action: any): IViewportState {
  const { x, y } = action.payload;
  return {
    ...state,
    isPanning: true,
    panOrigin: {
      x: x - state.xPos,
      y: y - state.yPos,
    },
  };
}

/** stop panning
 * @param state
 * @param action
 */
function panStopHandler(state: IViewportState): IViewportState {
  return {
    ...state,
    isPanning: false,
    panOrigin: null,
  };
}

const viewportReducer = createReducer(INITIAL_STATE, {
  [SET_VIEWPORT_ZOOM]: zoomHandler,
  [SET_VIEWPORT_POS]: panHandler,
  [START_PANNING]: panStartHandler,
  [STOP_PANNING]: panStopHandler,
});

export default viewportReducer;
