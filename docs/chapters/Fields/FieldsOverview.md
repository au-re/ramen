## Fields

Fields represent input values, or output values of a code block. Fields are located on Nodes and can
be connected to each other. They too need to be of a type defined in the schema.

### Field Types

```js
const schema = {
  fieldTypes: {
    numberField: {
      name: "number",
      color: "#eb529a",
      controlType: "numberControl",
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
| `controlType` | `string` | id of the controlType to use  | - |
| `validTargets` | `array` | array of fieldTypeId  | - |

If a controlType is defined, a control item will be displayed in the field.

### Field Instance

A node can contain various fields: inputs and outputs. Each one of these Field Instances can contain
some additional data, such as an **id**.

```js
const schema = {
  nodeTypes: {
    number: {
      fields: {
        in: [
          {
            id: "example1",
            fieldType: "numberField",
          }
        ]
      }
    },
  }
};
```

| Name | Type | Description | Required |
| --- | --- | --- | --- |
| `fieldType` | `string` | id of the field type | - |
| `id` | `string` | id of the field instance | - |
