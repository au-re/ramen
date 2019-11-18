## Getting Started

### Installation

Ramen can be installed via [npm](https://www.npmjs.com/package/ramen).

```bash
$ npm i -S @au-re/ramen
```

### Example Usage

```js
import NodeEditor  from "@au-re/ramen";
```

Start by creating a schema. The schema defines the types of nodes and fields as well as what connections can exist in your graph.

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