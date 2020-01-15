export const SET_SELECTION = "SET_SELECTION";

export function setSelection(selection: any) {
  const payload = { selection };
  return { type: SET_SELECTION, payload };
}
