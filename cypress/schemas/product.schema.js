export const productCreateSchema = {
  type: 'object',
  required: ['message', '_id'],
  properties: {
    message: { type: 'string' },
    _id: { type: 'string' }
  },
  additionalProperties: true
};

export const productSchema = {
  type: 'object',
  required: ['nome', 'preco', 'descricao', 'quantidade', '_id'],
  properties: {
    nome: { type: 'string' },
    preco: { type: 'number' },
    descricao: { type: 'string' },
    quantidade: { type: 'number' },
    _id: { type: 'string' }
  },
  additionalProperties: true
};

export const productListSchema = {
  type: 'object',
  required: ['quantidade', 'produtos'],
  properties: {
    quantidade: { type: 'number' },
    produtos: {
      type: 'array',
      items: productSchema
    }
  },
  additionalProperties: true
};

export const productErrorSchema = {
  type: 'object',
  required: ['message'],
  properties: {
    message: { type: 'string' }
  },
  additionalProperties: true
};
