## Adding fields

A Node that nothing can connect to is not very useful. Now lets connect something to it. Before we can do that, we need to add a Field to the Node. Just as we had to defined a nodeType to instantiate nodes from, we need a dataType to instantiate fields from. We add a dataType to our schema, and a field to our nodeType "numberNode".

```js
const schema = {
  nodeTypes: {
    numberNode: {
      name: "My Node",
      fields: [
        {
          id: "field1",
          dataType: "number",
          output: true,
        }
      ]
    },
  },
  dataTypes: {
    number: {
      name: "Number",
      color: "#7454a1"
    },
  },
};
```
