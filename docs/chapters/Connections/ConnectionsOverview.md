# Connections

Two Nodes can be linked together with a `Connection`, connections are persisted in the graph object along with node data. The example below will render a graph of two nodes, linked together by a connection.

```js
const graph = {
  nodes: [
    {
      id: "node1",
      x: 100,
      y: 50,
      type: "numberNode",
    },
    {
      id: "node2",
      x: 400,
      y: 50,
      type: "additionNode",
    }
  ],
  connections: [
    {
      originNode: "node1",
      originField: "number",
      targetNode: "node2",
      targetField: "number1",
    },
  ],
};
```

## Connection API

| Name | Type | Description | Required |
| --- | --- | --- | --- |
| `originNode` | `string` | id of the origin node | X |
| `originField` | `string` | id of the origin field | X |
| `targetNode` | `string` | id of the target node | X |
| `targetField` | `string` | id of the target field | X |

