import get from "lodash.get";
import * as React from "react";

import { RamenContext } from "../../context/RamenContext/RamenContext";
import { IEditorProps } from "../../types";
import Background from "../Background/Background";
import Field from "../Field/Field";
import Node from "../Node/Node";
import Noodle from "../Noodle/Noodle";
import Noodles from "../Noodles/Noodles";

const NODE_WIDTH = 200;
const PIN_SPACING = 42;
const HEADER_SPACING = 52;

function getNode(nodes: any, nodeId: string) {
  return nodes.find((node: any) => node.id === nodeId);
}

/**
 * given a connection return the start of it in x, y coordinates
 * @param nodes
 * @param connection
 */
function getConnectionStart(nodeType: any, node: any, connection: any) {
  const endPinIdx = get(nodeType, "fields.out", []).findIndex(
    (pin: any) => pin.id === connection.originPin);
  const y = node.y + (endPinIdx * PIN_SPACING) + HEADER_SPACING + (PIN_SPACING / 2);
  const x = node.x + NODE_WIDTH;
  return { x, y };
}

/**
 * given a connection return the end of it in x, y coordinates
 * @param nodes
 * @param connection
 */
function getConnectionEnd(nodeType: any, node: any, connection: any) {
  const startPinIdx = get(nodeType, "fields.in", []).findIndex(
    (pin: any) => pin.id === connection.targetPin) + get(nodeType, "fields.out.length", 0);
  const y = node.y + (startPinIdx * PIN_SPACING) + HEADER_SPACING + (PIN_SPACING / 2);
  return { x: node.x, y };
}

function Editor(props: IEditorProps) {
  const { schema, graph, editorHeight, editorWidth, updateNodeLocation, setGraph } = React.useContext(RamenContext);
  const { nodes, zoom } = graph;
  const { onConnectionCanceled = () => { }, onConnectionComplete = () => { } } = props;

  const [dragging, setDragging] = React.useState(null);
  const [connections = [], setConnections] = React.useState(graph.connections);
  const [mousePos, setMousePos] = React.useState({});

  // add an offset based on the main div offset from 0 0
  const boundingBox = React.useRef(null);

  React.useEffect(() => {
    const boundingBoxRect = boundingBox.current ? boundingBox.current.getBoundingClientRect() : {};
    const xOffset = boundingBoxRect.x;
    const yOffset = boundingBoxRect.y;

    const onMouseMove = (e: MouseEvent) => {
      const newMousePos = {
        x: ((e.x / zoom) - (xOffset / zoom)) + scrollX,
        y: ((e.y / zoom) - (yOffset / zoom)) + scrollY,
      };
      setMousePos(newMousePos);
    };

    const onMouseUp = (e: MouseEvent) => setDragging(null);

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, [zoom, boundingBox]);

  function startConnection(nodeId: string, pinId: string) {
    setDragging({ originNode: nodeId, originPin: pinId });
  }

  function cancelConnection(idx: number) {
    const connectionStart = connections.find((_, _idx: number) => (_idx === idx));
    setConnections(connections.filter((_, _idx: number) => (_idx !== idx)));
    setDragging({
      originNode: connectionStart.originNode,
      originPin: connectionStart.originPin,
    });
    onConnectionCanceled(connections[idx]);
  }

  function completeConnection(nodeId: string, pinId: string) {
    if (!dragging) return;

    const connection = {
      originNode: dragging.originNode,
      originPin: dragging.originPin,
      targetNode: nodeId,
      targetPin: pinId,
    };

    setConnections([connection, ...connections]);
    onConnectionComplete(connection);
  }

  return (
    <Background id="GraphEditor" height={editorHeight} width={editorWidth} ref={boundingBox}>
      {
        graph.nodes.map((node) => (
          <Node
            zoomLevel={graph.zoom}
            key={node.id}
            x={node.x}
            y={node.y}
            name={node.name || get(schema, `nodeTypes.${node.type}.name`, "")}
            onDrag={(e: any, location: any) => updateNodeLocation(node.id, location)}
          >
            {
              get(schema, `nodeTypes.${node.type}.fields.out`, []).map((field: any, idx: number) => (
                <Field
                  color={get(schema, `socketTypes.${field.type}.color`)}
                  key={idx}
                  hasOutput={true}
                  height={PIN_SPACING}
                  onMouseDown={() => startConnection(node.id, field.id)}
                >
                  {field.name}
                </Field>
              ))
            }
            {
              get(schema, `nodeTypes.${node.type}.fields.in`, []).map((field: any, idx: number) => (
                <Field
                  color={get(schema, `socketTypes.${field.type}.color`)}
                  key={idx}
                  hasInput={true}
                  height={PIN_SPACING}
                  onMouseUp={() => completeConnection(node.id, field.id)}
                >
                  {field.name}
                </Field>
              ))
            }
          </Node>
        ))
      }
      <Noodles>
        {
          connections.map((connection, idx: number) => {
            const startNode = getNode(nodes, connection.originNode);
            const startNodeType = schema.nodeTypes[startNode.type];
            const endNode = getNode(nodes, connection.targetNode);
            const endNodeType = schema.nodeTypes[endNode.type];
            return (
              <Noodle
                key={idx}
                start={getConnectionStart(startNodeType, startNode, connection)}
                end={getConnectionEnd(endNodeType, endNode, connection)}
                onMouseDown={() => cancelConnection(idx)}
              />
            );
          })
        }
        {
          dragging && (
            <Noodle
              start={getConnectionStart(schema.nodeTypes[getNode(nodes, dragging.originNode).type],
                getNode(nodes, dragging.originNode), dragging)}
              end={mousePos}
            />
          )
        }
      </Noodles>
    </Background>
  );
}

export default Editor;
