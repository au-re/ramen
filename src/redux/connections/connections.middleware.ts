import get from "lodash.get";
import { CREATE_CONNECTION } from "./connections.actions";
import { isValidConnection } from "./connections.selectors";

/**
 * middleware
 *
 * @param {*} store
 */
const connectionMiddleware = (store: any) => (next: any) => (action: any) => {
  const type = get(action, "type", "");
  const storeState = store.getState();

  // validate connection attempt
  if (type === CREATE_CONNECTION) {
    if (isValidConnection(storeState, action.payload.connection)) {
      return next(action);
    }
    return;
  }

  return next(action);
};

export default connectionMiddleware;
