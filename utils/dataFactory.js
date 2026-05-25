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
