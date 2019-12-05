# Controls

Controls are input fields that can be used to edit the state or properties of a Node. A Node can contain several Fields, each Field can contain a Control. Ramen comes with a few fields of its own but you can easily add your own Controls to the framework.

## Default Controls

By default Ramen comes with a styled input field called `defaultControl`. You can use this Control by adding a `controlType` property to your Node instance fields:

```js
const schema = {
  nodeTypes: {
    myNodeType: {
      name: "My Node Type",
      fields: [
        {
          id: "field1",
          dataType: "number",
          controlType: "defaultControl",
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

In the example above, an input field will be added to the field `field1`.

### Overriding Properties

You can override the default properties of a control type in the schema:

```js
const schema = {
  nodeTypes: {
    myNodeType: {
      name: "My Node Type",
      fields: [
        {
          id: "field1",
          dataType: "number",
          controlType: "defaultControl",
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
  controlTypes: {
    defaultControl: {
      min: 0,
      max: 100,
      step: 2,
      type: "number"
    }
  }
};
```

## Adding a Custom Control

> Note: a control should fit into the FIELD_HEIGHT size.

## Listening to data change from a Custom Control
