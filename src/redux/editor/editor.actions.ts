import { IGraphConnectionOrigin } from "../connections/connections.types";

export const SET_PENDING_CONNECTION_END_POS = "SET_PENDING_CONNECTION_END_POS";
export const SET_PENDING_CONNECTION_ORIGIN = "SET_PENDING_CONNECTION_ORIGIN";

export function setPendingConnectionEndPos(endPos: any) {
  const payload = { endPos };
  return { type: SET_PENDING_CONNECTION_END_POS, payload };
}

export function setPendingConnectionOrigin(connectionOrigin: IGraphConnectionOrigin) {
  const payload = { connectionOrigin };
  return { type: SET_PENDING_CONNECTION_ORIGIN, payload };
}
