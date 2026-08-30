export const loginSuccessSchema = {
  type: 'object',
  required: ['message', 'authorization'],
  properties: {
    message: { type: 'string' },
    authorization: { type: 'string', minLength: 10 }
  },
  additionalProperties: true
};

export const errorSchema = {
  type: 'object',
  required: ['message'],
  properties: {
    message: { type: 'string' }
  },
  additionalProperties: true
};

export const loginValidationErrorSchema = {
  type: 'object',
  properties: {
    email: { type: 'string' },
    password: { type: 'string' }
  },
  additionalProperties: true
};
