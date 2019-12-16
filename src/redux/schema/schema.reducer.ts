import { createReducer } from "../utils";
import { SET_SCHEMA } from "./schema.actions";
import { ISchema } from "./schema.types";

const initialSchemaState: ISchema = {};

function setSchemaHandler(state: ISchema, action: any) {
  const { newSchema } = action.payload;
  return { ...state, ...newSchema };
}

const schemaReducer = createReducer(initialSchemaState, {
  [SET_SCHEMA]: setSchemaHandler,
});

export default schemaReducer;
