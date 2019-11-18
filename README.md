[npm-url]: https://www.npmjs.com/package/@au-re/ramen
[npm-image]: https://img.shields.io/npm/v/@au-re/ramen
[commitizen-url]: http://commitizen.github.io/cz-cli/
[commitizen-image]: https://img.shields.io/badge/commitizen-friendly-brightgreen.svg
[license-url]: https://github.com/au-re/rimless/LICENSE
[dependencies-url]: https://david-dm.org/au-re/ramen
[dependencies-image]: https://david-dm.org/au-re/ramen/status.svg
[build-status]: https://travis-ci.org/au-re/ramen
[build-status-image]: https://travis-ci.org/au-re/ramen.svg?branch=master
[sonar-cloud]: https://sonarcloud.io/dashboard?id=au-re_ramen
[sonar-cloud-image]: https://sonarcloud.io/api/project_badges/measure?project=au-re_ramen&metric=alert_status
[package-size-url]: https://packagephobia.now.sh/result?p=@au-re/ramen
[package-size-image]: https://packagephobia.now.sh/badge?p=@au-re/ramen

<p align="center">
  <img src="https://raw.githubusercontent.com/au-re/ramen/master/assets/ramen.png"/>
</p>

# ramen

> **work in progress** - this library is not ready for use yet

**Ramen** is a simple but extensive react library for building node editors for visual programming.

[![npm][npm-image]][npm-url]
[![commitizen friendly][commitizen-image]][commitizen-url]
[![Quality Gate Status][sonar-cloud-image]][sonar-cloud]
[![Build Status][build-status-image]][build-status]
[![dependencies Status][dependencies-image]][dependencies-url]
[![install size][package-size-image]][package-size-url]

## Getting Started

> You can find examples and the complete documentation [here](https://au-re.github.io/ramen).

### Installation

Ramen can be installed via [npm](https://www.npmjs.com/package/ramen).

```
$ npm i -S @au-re/ramen
```

### Example Usage

```js
import NodeEditor  from "@au-re/ramen";
```

Start by creating a schema. The schema defines the types of nodes, fields and connections that can exist in your graph.

```js
const schema = {
  nodeTypes: {
    number: {
      fields: {
        out: [
        {
          id: "number",
          name: "Number",
          type: "number",
        }]
      }
    },
    add: {
      fields: {
        in: [
        {
          id: "number",
          name: "Number",
          type: "number",
        },
        {
          id: "number",
          name: "Number",
          type: "number",
        }]
      }
    }
  },
  socketTypes: {
    number: {
      color: "#333",
      validTargets: [
        "number",
      ],
    },
  },
};
```

The graph state is persisted in the following format:

```js
const graph = {
  xPos: 100,
  yPos: 200,
  nodes: [
    {
      id: "0",
      x: 100,
      y: 50,
      type: "number",
    },
    {
      id: "1",
      x: 100,
      y: 200,
      type: "number",
    },
    {
      id: "2",
      x: 450,
      y: 50,
      type: "add",
    },
  ],
  connections: [
    {
      originNode: "0",
      originPin: "number",
      targetNode: "2",
      targetPin: "number1",
    },
    {
      originNode: "1",
      originPin: "number",
      targetNode: "2",
      targetPin: "number2",
    },
  ],
}
```

To initialize a node editor you can pass both the schema and the graph. **Note that connections in `graph` that are not allowed by the schema will be ignored**.

```jsx
<NodeEditor
  schema={schema}
  initialGraph={graph}
/>
```

The NodeEditor can be either controlled or uncontrolled. By adding a graph property to the editor, it becomes controlled: Passing a new graph value to the editor will cause the editor to rerender and the graph will no longer update its own state internally. Instead you should use a callback to check changes in the graph.

```jsx
<NodeEditor
  graph={graph}
/>
```

You can listen to changes to the graph structure, e.g. a new connection is created, removed.

```jsx
<NodeEditor
  onNodeCreated
  onNodeDeleted
  onConnectionCreated
  onConnectionDeleted
  onGraphChange
  onControlChange
/>
```

### Field Controls

In order to update the state of a node it is often necessary to provide an input of some sorts for the case that no connection to a field exists.
For that reason you can pass custom inputs to ramen:

```js

function NumberControl(props) {
  const { defaultValue } = props;
  return <input type="number" />
}

const schema = {
  nodeTypes: {
    type1: {
      fields: {
        in: [
          {
            id: "input",
            type: "number",
            control: "number"
          }
        ]
      }
    }
  }
};

<NodeEditor
  schema={schema}
  controls={{
    number: NumberControl,
  }}
  onControlChange={(nodeId, fieldId, data) => {}}
/>
```

You can initialize the state of controls with the `initialGraph` value, or the `graph` value if you are using the editor controlled.

```js
const graph = {
  nodes: [
    {
      id: "0",
      type: "add",
      defaultValues: {
        number1: 10
      }
    },
  ],
};
```

## Customization

You can customize every aspect of the editor by either passing a custom theme or custom components.

Ramen uses the `styled-components` library for styling and `styled-theming` for theming. Passing a new theme is quite simple:

```jsx
import { ThemeProvider } from "styled-components";
import styledTheme from "styled-theming";

// example theme
const theme = {
  background: styledTheme("mode", {
    light: "#fafcfe",
    dark: "#14222D",
  }),
  borderColor: styledTheme("mode", {
    light: "#D9E1E7",
    dark: "#14222D",
  }),
};

<ThemeProvider theme={theme}>
  <NodeEditor />
<ThemeProvider
```

You can find more information on how to use the `ThemeProvider` and how to switch themes [here]().

### Custom Components

You can also provide custom components:

```jsx
function Background() {
  return (<div></div>);
}

<NodeEditor
  Background={Background}
/>
```

Custom components can be styled to your liking, and you can modify their internal behavior.

```jsx
// custom node with an input field instead of a title
function Node(props) {
  const { name } = props;
  return (
    <div>
      <input value={name} />
      {children}
    </div>)
}

<NodeEditor
  Node={Node}
/>
```

The following components can be passed as properties:

```jsx
<NodeEditor
  Background
  Node
  Noodle
  Field
  ContextMenu
  BoxSelection
/>
```

## Extending Functionality

Children of the node editor will be displayed overlaying the graph editor. You can access the internal state of the graph editor through the `editorContext`.

```jsx
import { editorContext } from "@au-re/ramen";

function MiniMap(props) {
  const { graph, setGraph } = React.useContext(editorContext);
  // render a minimap
}

<NodeEditor>
  <MiniMap />
</NodeEditor>
```

## API


## License

[MIT][license-url]