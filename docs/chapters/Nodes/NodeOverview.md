# Nodes

Nodes represent chunks of logic that you can wire together through **ramen**.

When you define a new graph you need to specify all node types that the graph should support, this
is done through a _schema_ that you pass to **ramen**.

## Node Types

```js
const schema = {
  nodeTypes: {
    numberNode: {
      fields: {
        out: [
        {
          id: "number",
          name: "Number",
          type: "numberField",
        }]
      }
    },
  }
};
```

The **nodeTypes** property of the schema is a map containing all different node types of the graph.
The graph above only contains a single node type called **numberNode**.

Each node type contains a map of **fields**. There are two types of fields, _out_ and _in_. Fields
represent properties or return values of the node. You can find more about properties in the
[Fields]() chapter.

Besides **fields** a node can contain **controls**. A control is an interface used to edit the state
of a node. Which controls a node has are specified by you. You can find more about controls in the
[Controls]() chapter.

## Node Type API

| Name | Type | Description | Required |
| --- | --- | --- | --- |
| `name` | `string` | name for the node type | - |
| `controls` | `array` | array of controlType ids (?) | - |
| `fields` | `object` | map of fields the node type  | - |
| `fields.in` | `array` | fields that act as properties for the node | - |
| `fields.out` | `array` | fields that act as return values for the node | - |

## Example

The example below represents a procedure that take two values as properties and returns the result
of adding these two numbers. Edit the schema to see it change.