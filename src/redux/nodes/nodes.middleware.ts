import get from "lodash.get";

import { IRamenEvents } from "../../types";
import { getConnections } from "../connections/connections.selectors";
import { DROP_NODE } from "./nodes.actions";
import { getNodes } from "./nodes.selectors";

const nodesMiddleware = (events: IRamenEvents) => (store: any) => (next: any) => (action: any) => {
  const type = get(action, "type", "");
  const storeState = store.getState();

  next(action);

  if (type === DROP_NODE) {
    events.onGraphChange({
      nodes: getNodes(storeState),
      connections: getConnections(storeState),
    });
  }
};

export default nodesMiddleware;
