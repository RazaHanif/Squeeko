import * as z from 'zod/v4';

function toZodSchema({
  fields,
  isClientSide
}) {
  const zodFields = Object.keys(fields).reduce((acc, key) => {
    const field = fields[key];
    if (!field) {
      return acc;
    }
    if (isClientSide && field.input === false) {
      return acc;
    }
    if (field.type === "string[]" || field.type === "number[]") {
      return {
        ...acc,
        [key]: z.array(field.type === "string[]" ? z.string() : z.number())
      };
    }
    if (Array.isArray(field.type)) {
      return {
        ...acc,
        [key]: z.any()
      };
    }
    let schema2 = z[field.type]();
    if (field?.required === false) {
      schema2 = schema2.optional();
    }
    if (field?.returned === false) {
      return acc;
    }
    return {
      ...acc,
      [key]: schema2
    };
  }, {});
  const schema = z.object(zodFields);
  return schema;
}

export { toZodSchema as t };
