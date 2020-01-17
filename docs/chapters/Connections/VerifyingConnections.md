## Verifying Connections

Users should not always be able to connect two fields to each other. Ramen allows you to set a list of valid targets for a dataType.

```js
const schema = {

  ...

  dataTypes: {
    number: {
      color: "#29abe1",
      validTargets: [
        "number",
      ],
    },
    text: {
      color: "#f8932b",
      validTargets: [
        "text",
      ],
    },
  },
}

```

Note that if the `validTargets` array is not defined, the datatype can be connected to any other datatype.
