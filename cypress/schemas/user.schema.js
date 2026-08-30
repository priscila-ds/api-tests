export const userCreateSchema = {
  type: 'object',
  required: ['message', '_id'],
  properties: {
    message: { type: 'string' },
    _id: { type: 'string', minLength: 1 }
  },
  additionalProperties: true
};

export const userSchema = {
  type: 'object',
  required: ['nome', 'email', 'password', 'administrador', '_id'],
  properties: {
    nome: { type: 'string' },
    email: { type: 'string' },
    password: { type: 'string' },
    administrador: { type: 'string', enum: ['true', 'false'] },
    _id: { type: 'string' }
  },
  additionalProperties: true
};

export const userListSchema = {
  type: 'object',
  required: ['quantidade', 'usuarios'],
  properties: {
    quantidade: { type: 'number', minimum: 0 },
    usuarios: {
      type: 'array',
      items: userSchema
    }
  },
  additionalProperties: true
};

export const userUpdateSchema = {
  type: 'object',
  required: ['message'],
  properties: {
    message: { type: 'string' }
  },
  additionalProperties: true
};

export const userDeleteSchema = {
  type: 'object',
  required: ['message'],
  properties: {
    message: { type: 'string' }
  },
  additionalProperties: true
};

export const userValidationErrorSchema = {
  type: 'object',
  properties: {
    nome: { type: 'string' },
    email: { type: 'string' },
    password: { type: 'string' },
    administrador: { type: 'string' }
  },
  additionalProperties: true
};
