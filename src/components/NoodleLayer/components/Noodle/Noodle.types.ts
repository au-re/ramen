import { IGraphConnection } from "../../../../redux/connections/connections.types";
import { IPosition } from "../../../../types";

export interface INoodleProps {
  id: number;
  start: IPosition;
  end: IPosition;
  onPointerDown?: () => void;
}
