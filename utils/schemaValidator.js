import Ajv from 'ajv';

const ajv = new Ajv({ allErrors: true, strict: false });

export const validateContract = (schema, responseBody) => {
  const validate = ajv.compile(schema);
  const isValid = validate(responseBody);

  if (!isValid) {
    throw new Error(`Contrato invalido: ${JSON.stringify(validate.errors, null, 2)}`);
  }
};
