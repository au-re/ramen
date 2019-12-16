import { EDITOR_ID, VIEWPORT_ID } from "../../constants";
import { createReducer } from "../utils";
import { SET_VIEWPORT_POS, SET_VIEWPORT_ZOOM, START_PANNING, STOP_PANNING } from "./viewport.actions";
import { IViewportState } from "./viewport.types";

const MAX_X = 0;
const MAX_Y = 0;

const INITIAL_STATE = {
  xPos: 0,
  yPos: 0,
  zoom: 1,
  settings: {
    zoomSpeed: 6,
    minZoom: 0.5,
    maxZoom: 1.7,
    padding: 20,
  },
};

/**
 * normalize the scroll behavior across browsers
 * @param delta
 */
export function normalizeScroll(delta: number) {
  const direction = delta > 0 ? -1 : 1;
  return direction;
}

/** given a zoom action, update the zoom if within boundaries
 * @param state
 * @param action
 */
function zoomHandler(state: IViewportState, action: any): IViewportState {
  const { zoom, x, y } = action.payload;

  const scrollSpeed = normalizeScroll(zoom);
  const delta = (scrollSpeed ? scrollSpeed / 120 : scrollSpeed / 3) * state.settings.zoomSpeed;
  const zoomChange = state.zoom * (1 + delta);

  if (zoomChange >= state.settings.minZoom && zoomChange <= state.settings.maxZoom) {

    const editor = document.getElementById(EDITOR_ID);
    const viewport = document.getElementById(VIEWPORT_ID);
    const viewportRect = viewport.getBoundingClientRect();

    const minX = -editor.offsetWidth + state.settings.padding;
    const minY = -editor.offsetHeight + state.settings.padding;

    const xPosChange = (viewportRect.left - x) * delta;
    const yPosChange = (viewportRect.top - y) * delta;

    const minXBoundary = -Math.abs(minX * zoomChange + viewport.offsetWidth);
    const minYBoundary = -Math.abs(minY * zoomChange + viewport.offsetHeight);
    const d = (state.zoom - zoomChange) / ((state.zoom - zoomChange) || 1);

    const newXPos = (state.xPos - xPosChange) * d;
    const newYPos = (state.yPos - yPosChange) * d;

    if (newXPos > MAX_X
      || newXPos < minXBoundary
      || newYPos > MAX_Y
      || newYPos < minYBoundary
    ) {
      return state;
    }

    return {
      ...state,
      zoom: zoomChange,
      xPos: newXPos,
      yPos: newYPos,
    };
  }

  return state;
}

/** given an action to pan, update the viewport location if within bounds
 * @param state
 * @param action
 */
function panHandler(state: IViewportState, action: any): IViewportState {
  if (!state.panOrigin) return;

  const { x, y } = action.payload;
  const delta = [x - state.panOrigin.x, y - state.panOrigin.y];

  let newXPos = delta[0];
  let newYPos = delta[1];

  const editor = document.getElementById(EDITOR_ID);
  const viewport = document.getElementById(VIEWPORT_ID);

  const minX = -editor.offsetWidth + state.settings.padding;
  const minY = -editor.offsetHeight + state.settings.padding;

  const minXBoundary = -Math.abs(minX * state.zoom + viewport.offsetWidth);
  const minYBoundary = -Math.abs(minY * state.zoom + viewport.offsetHeight);

  if (newXPos > MAX_X) newXPos = MAX_X;
  else if (newXPos < minXBoundary) newXPos = minXBoundary;

  if (newYPos > MAX_Y) newYPos = MAX_Y;
  else if (newYPos < minYBoundary) newYPos = minYBoundary;

  return {
    ...state,
    xPos: newXPos,
    yPos: newYPos,
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
