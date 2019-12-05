# Fields

Fields represent input values, or output values of a code block. Fields are located on Nodes and can
be connected to each other. They too need to be of a type defined in the schema.

## Data Types

```js
const schema = {
  dataTypes: {
    number: {
      name: "number",
      color: "#eb529a",
      validTargets: [
        "number",
      ],
    },
  }
};
```

A data type can used to restrict connections with other data types. **validTargets** is an array of data types, this data type can be connected to.

| Name | Type | Description | Required |
| --- | --- | --- | --- |
| `name` | `string` | name for the data type | - |
| `color` | `string` | color value for the pin of the field | - |
| `validTargets` | `array` | array of dataTypeId  | - |

## Field Instances

A node can contain various fields, some as inputs and outputs. Each one of these Field Instances can contain some additional data, such as an **id**.

```js
const schema = {
  nodeTypes: {
    number: {
      fields: [
        {
          id: "example1",
          name: "Number 1",
          dataType: "number",
        }
      ]
    },
  }
};
```

| Name | Type | Description | Required |
| --- | --- | --- | --- |
| `id` | `string` | id of the field | X |
| `name` | `string` | name for the field instance (overrides the field type name) | - |
| `dataType` | `string` | data type of the field (needs to be defined in dataTypes) | - |
| `controlType` | `string` | type of the control (no control is displayed if omited) | - |
| `input` | `boolean` | does the field contain an output node  | - |
| `output` | `boolean` |  does the field contain an input node  | - |

In the example below, the node uses our custom field. You can modify the schema and see the changes.