import produce from "immer";
import get from "lodash.get";

/** Build a reducer that triggers a handler when a case matches an action type
 * @param initialState
 * @param handlers
 */
export function createReducer(initialState: any, handlers: any) {
  return (state: any = initialState, action: any) => {
    const type = Object.keys(handlers).find((actionType) => get(action, "type") === actionType);
    if (!type) return state;
    return produce(state, (draft: any) => handlers[type](draft, action));
  };
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

export function isChildOfClass(el: any, className: any): boolean {
  if (typeof el.className === "string" && el.className.split(" ").indexOf(className) >= 0) return true;
  return !!(el.parentNode && isChildOfClass(el.parentNode, className));
}
