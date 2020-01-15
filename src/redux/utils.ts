import produce from "immer";
import get from "lodash.get";

/** Build a reducer that triggers a handler when a case matches an action type
 * @param initialState
 * @param handlers
 */
export function createReducer(initialState: any, handlers: any) {
  return produce((state = initialState, action) => {
    const type = Object.keys(handlers).find((actionType) => get(action, "type") === actionType);
    if (type) return produce(handlers[type])(state, action);
    return state;
  });
}

export function makeConnectionId(connection: any): string {
  return Object.keys(connection).sort().map((val: string) => connection[val]).join("_");
}

export function arrayToMap(array: any[]) {
  const map = array.reduce((map, item, idx) => {
    const { id } = item;
    const newItem = { ...item };
    newItem.idx = idx;
    map[id || idx] = newItem;
    return map;
  }, {});
  return map;
}

export function stringArrayToMap(array: any[]) {
  const map = array.reduce((map, item) => {
    map[item] = true;
    return map;
  }, {});
  return map;
}

export function connectionsToMap(array: any[]) {
  const map = array.reduce((map, item, idx) => {
    const id = makeConnectionId(item);
    const newItem = { ...item };
    map[id] = newItem;
    return map;
  }, {});
  return map;
}
