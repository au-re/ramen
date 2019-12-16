import { ISchema } from "./schema.types";

export const SET_SCHEMA = "SET_SCHEMA";

export function setSchema(newSchema: ISchema) {
  const payload = { newSchema };
  return { type: SET_SCHEMA, payload };
}
