export const SET_VIEWPORT_ZOOM = "SET_VIEWPORT_ZOOM";
export const SET_VIEWPORT_POS = "SET_VIEWPORT_POS";
export const START_PANNING = "START_PANNING";
export const STOP_PANNING = "STOP_PANNING";

export function setViewportZoom(zoom: number, x: number, y: number) {
  const payload = { zoom, x, y };
  return { type: SET_VIEWPORT_ZOOM, payload };
}

export function setViewportPos(x: number, y: number) {
  const payload = { x, y };
  return { type: SET_VIEWPORT_POS, payload };
}

export function startPanning(x: number, y: number) {
  const payload = { x, y };
  return { type: START_PANNING, payload };
}

export function stopPanning() {
  return { type: STOP_PANNING };
}
