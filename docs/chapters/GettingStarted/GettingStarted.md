# Getting Started

Ramen allows you to view and edit the structure of a node graph of the type often used for visual
programming.

> **Ramen** does not provide a way to execute code, its goal is to generate an object representing the current state of the graph whenever the user makes changes to it.

## Installation

Ramen can be installed via [npm](https://www.npmjs.com/package/ramen).

```bash
npm i -S @au-re/ramen
```

## Example Usage

Start by creating a schema. The schema defines the types of nodes and sockets as well as what connections can exist in your graph.

```js
const schema = {
  nodeTypes: {
    numberNode: {
      name: "My Node",
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
      type: "numberNode",
    }
  ],
  connections: [],
};
```

With the schema and the initial graph state ready we can initialize our editor:

```js
import Ramen from "@au-re/ramen";

<Ramen
  schema={schema}
  initialGraph={graph}
  canZoom={false}
  canPan={false}
  height={400}
/>
```

You can see the resulting graph below, it consists of a single Node with no fields and with no connections: