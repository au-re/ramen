import { IGraphConnection } from "./connections.types";

export const DELETE_CONNECTION = "DELETE_CONNECTION";
export const CREATE_CONNECTION = "CREATE_CONNECTION";

export function deleteConnection(connectionId: string) {
  const payload = { connectionId };
  return { type: DELETE_CONNECTION, payload };
}

export function createConnection(connection: IGraphConnection) {
  const payload = { connection };
  return { type: CREATE_CONNECTION, payload };
}
