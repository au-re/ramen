import { IPosition } from "../../types";

export interface IViewportState {
  xPos: number;
  yPos: number;
  zoom: number;
  isPanning?: boolean;
  panOrigin?: IPosition | null;
  settings: {
    zoomSpeed: number;
    minZoom: number;
    maxZoom: number;
    padding: number;
  };
}
