import { UsersService } from '../../../services/users.service';
import { buildInvalidUser, buildUser } from '../../../utils/dataFactory';
import { validateContract } from '../../../utils/schemaValidator';
import { errorSchema } from '../../schemas/auth.schema';

describe('Users API - Cenarios Negativos', () => {
  it('deve retornar erro ao buscar usuario inexistente', () => {
    const invalidId = 'id-inexistente-123';

    UsersService.getById(invalidId).then((response) => {
      expect(response.status).to.eq(400);
    });
  });

  it('deve permitir atualizar usuario inexistente (cria novo)', () => {
    const invalidId = 'id-inexistente-123';
    const user = buildUser();

    UsersService.update(invalidId, user).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body.message).to.contain('Cadastro realizado com sucesso');

      UsersService.delete(response.body._id);
    });
  });

  it('deve retornar sucesso ao deletar usuario inexistente', () => {
    const invalidId = 'id-inexistente-123';

    UsersService.delete(invalidId).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.message).to.contain('Nenhum registro excluído');
    });
  });

  it('deve validar campos obrigatorios no cadastro', () => {
    const invalidUser = buildInvalidUser();

    UsersService.create(invalidUser).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body).to.have.property('nome');
      expect(response.body).to.have.property('email');
      expect(response.body).to.have.property('password');
    });
  });

  it('deve validar formato de email invalido', () => {
    const user = buildUser({ email: 'email-sem-arroba.com' });

    UsersService.create(user).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body.email).to.contain('email');
    });
  });

  it('deve permitir cadastro de usuario nao administrador', () => {
    const user = buildUser({ administrador: 'false' });

    UsersService.create(user).then((createResponse) => {
      expect(createResponse.status).to.eq(201);

      UsersService.getById(createResponse.body._id).then((getResponse) => {
        expect(getResponse.status).to.eq(200);
        expect(getResponse.body.administrador).to.eq('false');

        UsersService.delete(createResponse.body._id);
      });
    });
  });
});
