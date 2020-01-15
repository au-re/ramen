export interface ISelection {
  [itemId: string]: boolean;
}

export interface ISetSelectionAction {
  type: string;
  payload: {
    selection: string[],
  };
}
