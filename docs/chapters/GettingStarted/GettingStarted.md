## Getting Started

### Installation

Ramen can be installed via [npm](https://www.npmjs.com/package/ramen).

```bash
$ npm i -S @au-re/ramen
```

### Example Usage

Start by creating a schema. The schema defines the types of nodes and sockets as well as what connections can exist in your graph.

```js
const schema = {
  nodeTypes: {
    number: {
      fields: {
        out: [
        {
          id: "number",
          name: "Number",
          type: "numberSocket",
        }]
      }
    },
  },
  socketTypes: {
    numberSocket: {
      color: "#29abe1",
      validTargets: [
        "numberSocket",
      ],
    },
  },
};
```

You can also pass an initial state to the editor, this is optional. Only nodes with types declared in the schema will be displayed.

```js
const graph = {
  nodes: [
    {
      id: "0",
      x: 100,
      y: 50,
      type: "number",
    }
  ],
  connections: [],
};
```

With the schema and the initial graph state ready we can initialize our editor:

```js
import Editor, { RamenProvider } from "ramen";

<RamenProvider initialGraph={graph} schema={schema}>
  <Editor
    canZoom={false}
    canPan={false}
    height={400}
  />
</RamenProvider>
```

You can see the resulting graph below, it consists of a single Node with no connections: