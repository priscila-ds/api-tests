export const cartCreateSchema = {
  type: 'object',
  required: ['message', '_id'],
  properties: {
    message: { type: 'string' },
    _id: { type: 'string' }
  },
  additionalProperties: true
};

export const cartItemSchema = {
  type: 'object',
  required: ['idProduto', 'quantidade', 'precoUnitario'],
  properties: {
    idProduto: { type: 'string' },
    quantidade: { type: 'number' },
    precoUnitario: { type: 'number' }
  },
  additionalProperties: true
};

export const cartSchema = {
  type: 'object',
  required: ['produtos', 'precoTotal', 'quantidadeTotal', 'idUsuario', '_id'],
  properties: {
    produtos: {
      type: 'array',
      items: cartItemSchema
    },
    precoTotal: { type: 'number' },
    quantidadeTotal: { type: 'number' },
    idUsuario: { type: 'string' },
    _id: { type: 'string' }
  },
  additionalProperties: true
};

export const cartListSchema = {
  type: 'object',
  required: ['quantidade', 'carrinhos'],
  properties: {
    quantidade: { type: 'number' },
    carrinhos: {
      type: 'array',
      items: cartSchema
    }
  },
  additionalProperties: true
};

export const cartErrorSchema = {
  type: 'object',
  required: ['message'],
  properties: {
    message: { type: 'string' }
  },
  additionalProperties: true
};
