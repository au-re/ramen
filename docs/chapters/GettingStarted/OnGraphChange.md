## Accessing graph changes

You can access changes to the graph with the **onGraphChange** property.

```js
import Editor, { RamenProvider } from "ramen";

<RamenProvider
  initialGraph={graph}
  schema={schema}
  onGraphChange={(newState) => { /* do something with the new graph state */ }}
>
  <Editor
    canZoom={false}
    canPan={false}
    height={400}
  />
</RamenProvider>
```

Moving a node, creating/deleting a connection or editing a control are all actions that will cause
onGraphChange to trigger.
