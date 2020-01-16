## Accessing graph changes

You can access changes to the graph with the **onGraphChange** property.

```js
import Ramen from "@au-re/ramen";

<Ramen
  schema={schema}
  initialGraph={graph}
  onGraphChange={(newState) => { /* do something with the new graph state */ }}
  canZoom={false}
  canPan={false}
  height={400}
/>
```

Moving a node, creating/deleting a connection or editing a control are all actions that will cause onGraphChange to trigger.
