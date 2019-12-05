## Adding fields

A Node that nothing can connect to is not very useful. Now lets connect something to it. Before we can do that, we need to add a Field to the Node. Just as we had to defined a nodeType to instantiate nodes from, we need a fieldType to instantiate fields from. We add a fieldType to our schema, and a field to our nodeType "numberNode". There are

```js
const schema = {
  nodeTypes: {
    numberNode: {
      name: "My Node",
      fields: [
        {
          id: "field1",
          fieldType: "numberField",
          output: true,
        }
      ]
    },
  },
  fieldTypes: {
    numberField: {
      name: "Number",
      color: "#7454a1"
    },
  },
};
```
