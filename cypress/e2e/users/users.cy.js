import { UsersService } from '../../../services/users.service';
import { buildUser } from '../../../utils/dataFactory';
import { validateContract } from '../../../utils/schemaValidator';
import { errorSchema } from '../../schemas/auth.schema';
import { userCreateSchema, userListSchema, userSchema } from '../../schemas/user.schema';

const RESPONSE_TIME_SLA_MS = 5000;

describe('Users API', () => {
  it('deve criar, consultar e remover um usuario', () => {
    const user = buildUser();

    UsersService.create(user).then((createResponse) => {
      expect(createResponse.status).to.eq(201);
      validateContract(userCreateSchema, createResponse.body);

      const userId = createResponse.body._id;

      UsersService.getById(userId).then((getResponse) => {
        expect(getResponse.status).to.eq(200);
        expect(getResponse.body).to.include({
          nome: user.nome,
          email: user.email,
          administrador: user.administrador
        });
        validateContract(userSchema, getResponse.body);

        UsersService.delete(userId).then((deleteResponse) => {
          expect(deleteResponse.status).to.eq(200);
          expect(deleteResponse.body.message).to.contain('Registro');
          expect(deleteResponse.body.message).to.contain('sucesso');
        });
      });
    });
  });

  it('deve atualizar um usuario existente', () => {
    const user = buildUser();
    const updatedUser = {
      ...user,
      nome: `${user.nome} Updated`
    };

    UsersService.create(user).then((createResponse) => {
      const userId = createResponse.body._id;

      UsersService.update(userId, updatedUser).then((updateResponse) => {
        expect(updateResponse.status).to.eq(200);
        expect(updateResponse.body.message).to.contain('Registro alterado');

        UsersService.getById(userId).then((getResponse) => {
          expect(getResponse.status).to.eq(200);
          expect(getResponse.body.nome).to.eq(updatedUser.nome);

          UsersService.delete(userId);
        });
      });
    });
  });

  it('deve impedir cadastro com email ja utilizado', () => {
    const user = buildUser();

    UsersService.create(user).then((createResponse) => {
      expect(createResponse.status).to.eq(201);

      UsersService.create(user).then((duplicatedResponse) => {
        expect(duplicatedResponse.status).to.eq(400);
        expect(duplicatedResponse.body.message).to.contain('Este email');
        expect(duplicatedResponse.body.message).to.contain('sendo usado');
        validateContract(errorSchema, duplicatedResponse.body);

        UsersService.delete(createResponse.body._id);
      });
    });
  });

  it('deve listar usuarios dentro do tempo esperado', () => {
    UsersService.list().then((response) => {
      expect(response.status).to.eq(200);
      expect(response.duration).to.be.lessThan(RESPONSE_TIME_SLA_MS);
      validateContract(userListSchema, response.body);
    });
  });
});
