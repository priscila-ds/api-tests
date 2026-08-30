import { AuthService } from '../../../services/auth.service';
import { validateContract } from '../../../utils/schemaValidator';
import { errorSchema } from '../../schemas/auth.schema';

describe('Auth API - Cenarios Negativos', () => {
  it('deve retornar erro ao fazer login sem email', () => {
    AuthService.login({
      password: 'senha123'
    }).then((response) => {
      expect(response.status).to.eq(401);
      validateContract(errorSchema, response.body);
    });
  });

  it('deve retornar erro ao fazer login sem senha', () => {
    AuthService.login({
      email: 'teste@teste.com'
    }).then((response) => {
      expect(response.status).to.eq(401);
      validateContract(errorSchema, response.body);
    });
  });

  it('deve retornar erro ao fazer login com email vazio', () => {
    AuthService.login({
      email: '',
      password: 'senha123'
    }).then((response) => {
      expect(response.status).to.eq(401);
      validateContract(errorSchema, response.body);
    });
  });

  it('deve retornar erro ao fazer login com senha vazia', () => {
    AuthService.login({
      email: 'teste@teste.com',
      password: ''
    }).then((response) => {
      expect(response.status).to.eq(401);
      validateContract(errorSchema, response.body);
    });
  });

  it('deve retornar erro ao fazer login com payload vazio', () => {
    AuthService.login({}).then((response) => {
      expect(response.status).to.eq(401);
      validateContract(errorSchema, response.body);
    });
  });

  it('deve validar contrato de erro para credenciais invalidas', () => {
    AuthService.login({
      email: 'usuario@inexistente.com',
      password: 'senhaerrada123'
    }).then((response) => {
      expect(response.status).to.eq(401);
      expect(response.body.message).to.contain('Email e/ou senha');
      validateContract(errorSchema, response.body);
    });
  });
});
