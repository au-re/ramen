import get from "lodash.get";

import { IStoreState } from "../types";
import { SET_VIEWPORT_POS, SET_VIEWPORT_ZOOM } from "./viewport.actions";

const MAX_X = 0;
const MAX_Y = 0;

/**
 * normalize the scroll behavior across browsers
 * @param delta
 */
export function normalizeScroll(delta: number) {
  const direction = delta > 0 ? -1 : 1;
  return direction;
}

/** given an action to zoom the viewport, calculate the new zoom level and position for the viewport
 * return a new action with this information, or a ZOOM_BLOCKED action if no zoom action
 * can be performed
 * @param state
 * @param action
 */
function transformZoomAction(state: IStoreState, action: any) {
  const { zoom: zoomMovement, x, y } = action.payload;
  const { settings, zoom, xPos, yPos } = get(state, "viewport");
  const { viewportId, editorId } = get(state, "references");

  const scrollSpeed = normalizeScroll(zoomMovement);
  const delta = (scrollSpeed ? scrollSpeed / 120 : scrollSpeed / 3) * settings.zoomSpeed;
  const zoomChange = zoom * (1 + delta);

  if (zoomChange >= settings.minZoom && zoomChange <= settings.maxZoom) {

    const editor = document.getElementById(editorId);
    const viewport = document.getElementById(viewportId);
    const viewportRect = viewport.getBoundingClientRect();

    const minX = -editor.offsetWidth + settings.padding;
    const minY = -editor.offsetHeight + settings.padding;

    const xPosChange = (viewportRect.left - x) * delta;
    const yPosChange = (viewportRect.top - y) * delta;

    const minXBoundary = -Math.abs(minX * zoomChange + viewport.offsetWidth);
    const minYBoundary = -Math.abs(minY * zoomChange + viewport.offsetHeight);
    const d = (zoom - zoomChange) / ((zoom - zoomChange) || 1);

    let newXPos = (xPos + xPosChange) * d;
    let newYPos = (yPos + yPosChange) * d;

    if (newXPos >= MAX_X) newXPos = MAX_X;
    else if (newXPos < minXBoundary) newXPos = minXBoundary;

    if (newYPos >= MAX_Y) newYPos = MAX_Y;
    else if (newYPos < minYBoundary) newYPos = minYBoundary;

    return {
      ...action,
      payload: {
        zoom: zoomChange,
        x: newXPos,
        y: newYPos,
      },
    };
  }

  return { type: "ZOOM_BLOCKED" };
}

/** given an action to pan the viewport, calculate the new position for the viewport
 * @param state
 * @param action
 */
function transformPanAction(state: IStoreState, action: any) {
  const { x, y } = action.payload;
  const { settings, panOrigin, zoom } = get(state, "viewport");
  const { viewportId, editorId } = get(state, "references");

  const delta = [x - panOrigin.x, y - panOrigin.y];

  let newXPos = delta[0];
  let newYPos = delta[1];

  const editor = document.getElementById(editorId);
  const viewport = document.getElementById(viewportId);

  const minX = -editor.offsetWidth + get(settings, "padding", 0);
  const minY = -editor.offsetHeight + get(settings, "padding", 0);

  const minXBoundary = -Math.abs(minX * zoom + viewport.offsetWidth);
  const minYBoundary = -Math.abs(minY * zoom + viewport.offsetHeight);

  if (newXPos > MAX_X) newXPos = MAX_X;
  else if (newXPos < minXBoundary) newXPos = minXBoundary;

  if (newYPos > MAX_Y) newYPos = MAX_Y;
  else if (newYPos < minYBoundary) newYPos = minYBoundary;

  return {
    ...action,
    payload: {
      x: newXPos,
      y: newYPos,
    },
  };
}

/** enrich viewport actions
 * @param store
 */
const viewportMiddleware = (store: any) => (next: any) => (action: any) => {
  const storeState = store.getState();

  if (action.type === SET_VIEWPORT_ZOOM) {
    return next(transformZoomAction(storeState, action));
  }

  if (action.type === SET_VIEWPORT_POS) {
    const { isPanning } = storeState.viewport;
    if (!isPanning) return;
    return next(transformPanAction(storeState, action));
  }

  return next(action);
};

export default viewportMiddleware;
