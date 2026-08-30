const uniqueId = () => `${Date.now()}${Math.floor(Math.random() * 10000)}`;

export const buildUser = (overrides = {}) => {
  const id = uniqueId();

  return {
    nome: `QA User ${id}`,
    email: `qa.user.${id}@mailinator.com`,
    password: 'Teste@123',
    administrador: 'true',
    ...overrides
  };
};

export const buildProduct = (overrides = {}) => {
  const id = uniqueId();

  return {
    nome: `Produto QA ${id}`,
    preco: Math.floor(Math.random() * 1000) + 1,
    descricao: `Descricao do produto ${id}`,
    quantidade: Math.floor(Math.random() * 100) + 1,
    ...overrides
  };
};

export const buildCart = (productId, quantity = 1) => ({
  produtos: [
    {
      idProduto: productId,
      quantidade: quantity
    }
  ]
});

export const buildInvalidUser = () => ({
  nome: '',
  email: 'email-invalido',
  password: '',
  administrador: 'true'
});

export const buildInvalidProduct = () => ({
  nome: '',
  preco: -10,
  descricao: '',
  quantidade: -5
});
