import * as React from "react";

export const SelectionContext = React.createContext({} as any);

/**
 * Provides the state of the selected nodes.
 *
 * @param {*} props
 */
function SelectionProvider(props: any) {
  const { children } = props;
  const [isSelecting, setSelecting] = React.useState(false);
  const [selection, setSelection] = React.useState({});

  function addToSelection(nodeId: string) {
    setSelection({ ...selection, [nodeId]: true });
  }

  function handleSelection(nodes: string[]) {
    setSelection(nodes.reduce((acc: any, cur: string) => {
      acc[cur] = true;
      return acc;
    }, {}));
  }

  const contextValue = {
    isSelecting,
    setSelecting,
    selection: Object.keys(selection),
    setSelection: handleSelection,
    addToSelection,
  };

  return (
    <SelectionContext.Provider value={contextValue}>
      {children}
    </SelectionContext.Provider>
  );
}

export default SelectionProvider;
