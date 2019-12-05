# Nodes

Nodes represent chunks of logic that you can wire together through **ramen**.

When you define a new graph you need to specify all node types that the graph should support, this
is done through a _schema_ that you pass to **ramen**.

## Node Types

```js
const schema = {
  nodeTypes: {
    numberNode: {
      fields: [
        {
          id: "number",
          name: "Number",
          dataType: "number",
          output: true,
        }
      ]
    },
  }
};
```

The **nodeTypes** property of the schema is a map containing all different node types of the graph. The graph above only contains a single node type called **numberNode**.

Each node type contains a map of **fields**. There are two types of fields, _out_ and _in_. Fields represent properties or return values of the node. You can find more about properties in the [Fields]() chapter.

Besides **fields** a node can contain **controls**. A control is an interface used to edit the state of a node. Which controls a node has are specified by you. You can find more about controls in the [Controls]() chapter.

## Node Type API

| Name | Type | Description | Required |
| --- | --- | --- | --- |
| `name` | `string` | name for the node type | - |
| `fields` | `array` | array of fields in the node  | - |

### field

| Name | Type | Description | Required |
| --- | --- | --- | --- |
| `id` | `string` | id of the field | X |
| `name` | `string` | name for the field instance (overrides the field type name) | - |
| `dataType` | `string` | data type of the field (needs to be defined in dataTypes) | - |
| `controlType` | `string` | type of the control (no control is displayed if omited) | - |
| `input` | `boolean` | does the field contain an output node  | - |
| `output` | `boolean` |  does the field contain an input node  | - |

## Example

The example below represents a procedure that take two values as properties and returns the result
of adding these two numbers. Edit the schema to see it change.