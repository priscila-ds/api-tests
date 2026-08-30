import { AuthService } from '../../../services/auth.service';
import { CartsService } from '../../../services/carts.service';
import { ProductsService } from '../../../services/products.service';
import { UsersService } from '../../../services/users.service';
import { buildCart, buildProduct, buildUser } from '../../../utils/dataFactory';
import { validateContract } from '../../../utils/schemaValidator';
import { errorSchema } from '../../schemas/auth.schema';
import {
  cartCreateSchema,
  cartListSchema,
  cartSchema
} from '../../schemas/cart.schema';

const RESPONSE_TIME_SLA_MS = 5000;

describe('Carts API', () => {
  let testProductId;
  let adminToken;
  let adminUserId;

  before(() => {
    const adminUser = buildUser({ administrador: 'true' });

    UsersService.create(adminUser).then((response) => {
      adminUserId = response.body._id;

      AuthService.login({
        email: adminUser.email,
        password: adminUser.password
      }).then((loginResponse) => {
        adminToken = loginResponse.body.authorization;

        const product = buildProduct({ quantidade: 100 });
        ProductsService.create(product, adminToken).then((productResponse) => {
          testProductId = productResponse.body._id;
        });
      });
    });
  });

  after(() => {
    if (testProductId) {
      ProductsService.delete(testProductId, adminToken);
    }
    if (adminUserId) {
      UsersService.delete(adminUserId);
    }
  });

  it('deve criar, consultar e cancelar um carrinho', () => {
    const newUser = buildUser({ administrador: 'true' });

    UsersService.create(newUser).then((userResponse) => {
      const userId = userResponse.body._id;

      AuthService.login({
        email: newUser.email,
        password: newUser.password
      }).then((loginResponse) => {
        const token = loginResponse.body.authorization;
        const cart = buildCart(testProductId, 2);

        CartsService.create(cart, token).then((createResponse) => {
          expect(createResponse.status).to.eq(201);
          validateContract(cartCreateSchema, createResponse.body);

          const cartId = createResponse.body._id;

          CartsService.getById(cartId).then((getResponse) => {
            expect(getResponse.status).to.eq(200);
            expect(getResponse.body.produtos).to.have.length(1);
            expect(getResponse.body.produtos[0].idProduto).to.eq(testProductId);
            expect(getResponse.body.produtos[0].quantidade).to.eq(2);
            validateContract(cartSchema, getResponse.body);

            CartsService.cancel(token).then((cancelResponse) => {
              expect(cancelResponse.status).to.eq(200);
              expect(cancelResponse.body.message).to.contain('Registro');
              expect(cancelResponse.body.message).to.contain('sucesso');

              UsersService.delete(userId);
            });
          });
        });
      });
    });
  });

  it('deve listar carrinhos dentro do tempo esperado', () => {
    CartsService.list().then((response) => {
      expect(response.status).to.eq(200);
      expect(response.duration).to.be.lessThan(RESPONSE_TIME_SLA_MS);
      validateContract(cartListSchema, response.body);
    });
  });

  it('deve retornar erro ao buscar carrinho inexistente', () => {
    const invalidId = 'id-inexistente-123';

    CartsService.getById(invalidId).then((response) => {
      expect(response.status).to.eq(400);
    });
  });

  it('deve retornar erro ao criar carrinho sem autenticacao', () => {
    const cart = buildCart(testProductId, 1);

    CartsService.create(cart, null).then((response) => {
      expect(response.status).to.eq(401);
      validateContract(errorSchema, response.body);
    });
  });

  it('deve retornar erro ao criar segundo carrinho para mesmo usuario', () => {
    const newUser = buildUser({ administrador: 'true' });

    UsersService.create(newUser).then((userResponse) => {
      const userId = userResponse.body._id;

      AuthService.login({
        email: newUser.email,
        password: newUser.password
      }).then((loginResponse) => {
        const token = loginResponse.body.authorization;
        const cart = buildCart(testProductId, 1);

        CartsService.create(cart, token).then((createResponse) => {
          expect(createResponse.status).to.eq(201);

          CartsService.create(cart, token).then((secondResponse) => {
            expect(secondResponse.status).to.eq(400);
            expect(secondResponse.body.message).to.contain('Não é permitido ter mais de 1 carrinho');
            validateContract(errorSchema, secondResponse.body);

            CartsService.cancel(token).then(() => {
              UsersService.delete(userId);
            });
          });
        });
      });
    });
  });

  it('deve retornar erro ao criar carrinho com produto inexistente', () => {
    const newUser = buildUser({ administrador: 'true' });

    UsersService.create(newUser).then((userResponse) => {
      const userId = userResponse.body._id;

      AuthService.login({
        email: newUser.email,
        password: newUser.password
      }).then((loginResponse) => {
        const token = loginResponse.body.authorization;
        const cart = buildCart('produto-inexistente-123', 1);

        CartsService.create(cart, token).then((response) => {
          expect(response.status).to.eq(400);
          expect(response.body.message).to.contain('Produto não encontrado');
          validateContract(errorSchema, response.body);

          UsersService.delete(userId);
        });
      });
    });
  });

  it('deve retornar erro ao criar carrinho com quantidade maior que estoque', () => {
    const newUser = buildUser({ administrador: 'true' });

    UsersService.create(newUser).then((userResponse) => {
      const userId = userResponse.body._id;

      AuthService.login({
        email: newUser.email,
        password: newUser.password
      }).then((loginResponse) => {
        const token = loginResponse.body.authorization;
        const cart = buildCart(testProductId, 99999);

        CartsService.create(cart, token).then((response) => {
          expect(response.status).to.eq(400);
          expect(response.body.message).to.contain('Produto não possui quantidade suficiente');
          validateContract(errorSchema, response.body);

          UsersService.delete(userId);
        });
      });
    });
  });
});
