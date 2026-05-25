import { AuthService } from '../../../services/auth.service';
import { UsersService } from '../../../services/users.service';
import { buildUser } from '../../../utils/dataFactory';
import { validateContract } from '../../../utils/schemaValidator';
import { errorSchema, loginSuccessSchema } from '../../schemas/auth.schema';

describe('Auth API', () => {
  it('deve autenticar um usuario administrador com sucesso', () => {
    const user = buildUser({ administrador: 'true' });

    UsersService.create(user).then((createResponse) => {
      expect(createResponse.status).to.eq(201);

      AuthService.login({
        email: user.email,
        password: user.password
      }).then((loginResponse) => {
        expect(loginResponse.status).to.eq(200);
        expect(loginResponse.body.authorization).to.match(/^Bearer\s.+/);
        validateContract(loginSuccessSchema, loginResponse.body);

        UsersService.delete(createResponse.body._id).then((deleteResponse) => {
          expect(deleteResponse.status).to.eq(200);
        });
      });
    });
  });

  it('deve retornar 401 para credenciais invalidas', () => {
    cy.fixture('auth').then(({ invalidLogin }) => {
      AuthService.login(invalidLogin).then((response) => {
        expect(response.status).to.eq(401);
        expect(response.body.message).to.contain('Email e/ou senha');
        validateContract(errorSchema, response.body);
      });
    });
  });
});
