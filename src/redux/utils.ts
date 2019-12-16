import produce from "immer";
import _ from "lodash";

/** Build a reducer that triggers a handler when a case matches an action type
 * @param initialState
 * @param handlers
 */
export function createReducer(initialState: any, handlers: any) {
  return produce((state = initialState, action) => {
    const type = Object.keys(handlers).find((actionType) => _.get(action, "type") === actionType);
    if (type) return produce(handlers[type])(state, action);
    return state;
  });
}

export function makeConnectionId(connection: any): string {
  return Object.keys(connection).sort().map((val: string) => connection[val]).join("_");
}
