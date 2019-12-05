# Fields

Fields represent input values, or output values of a code block. Fields are located on Nodes and can
be connected to each other. They too need to be of a type defined in the schema.

## Field Types

```js
const schema = {
  fieldTypes: {
    numberField: {
      name: "number",
      color: "#eb529a",
      validTargets: [
        "number",
      ],
    },
  }
};
```

A field type can be restricted to connect only with other field types. **validTargets** is an array
of field types, this field can be connected to.

| Name | Type | Description | Required |
| --- | --- | --- | --- |
| `name` | `string` | name for the field type | - |
| `color` | `string` | color value for the pin of the field | - |
| `validTargets` | `array` | array of fieldTypeId  | - |

If a controlType is defined, a control item will be displayed in the field.

## Field Instances

A node can contain various fields: inputs and outputs. Each one of these Field Instances can contain
some additional data, such as an **id**.

```js
const schema = {
  nodeTypes: {
    number: {
      fields: [
        {
          id: "example1",
          name: "Number 1",
          fieldType: "numberField",
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
| `fieldType` | `string` | type of the field (needs to be defined in fieldTypes) | - |
| `controlType` | `string` | type of the control (no control is displayed if omited) | - |
| `input` | `boolean` | does the field contain an output node  | - |
| `output` | `boolean` |  does the field contain an input node  | - |

In the example below, the node uses our custom field. You can modify the schema and see the changes.