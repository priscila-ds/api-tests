import { AuthService } from '../../../services/auth.service';
import { ProductsService } from '../../../services/products.service';
import { UsersService } from '../../../services/users.service';
import { buildProduct, buildUser } from '../../../utils/dataFactory';
import { validateContract } from '../../../utils/schemaValidator';
import { errorSchema } from '../../schemas/auth.schema';
import {
  productCreateSchema,
  productListSchema,
  productSchema
} from '../../schemas/product.schema';

const RESPONSE_TIME_SLA_MS = 5000;

describe('Products API', () => {
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
      });
    });
  });

  after(() => {
    if (adminUserId) {
      UsersService.delete(adminUserId);
    }
  });

  it('deve criar, consultar e remover um produto', () => {
    const product = buildProduct();

    ProductsService.create(product, adminToken).then((createResponse) => {
      expect(createResponse.status).to.eq(201);
      validateContract(productCreateSchema, createResponse.body);

      const productId = createResponse.body._id;

      ProductsService.getById(productId).then((getResponse) => {
        expect(getResponse.status).to.eq(200);
        expect(getResponse.body).to.include({
          nome: product.nome,
          preco: product.preco,
          descricao: product.descricao,
          quantidade: product.quantidade
        });
        validateContract(productSchema, getResponse.body);

        ProductsService.delete(productId, adminToken).then((deleteResponse) => {
          expect(deleteResponse.status).to.eq(200);
          expect(deleteResponse.body.message).to.contain('Registro');
          expect(deleteResponse.body.message).to.contain('sucesso');
        });
      });
    });
  });

  it('deve atualizar um produto existente', () => {
    const product = buildProduct();
    const updatedProduct = {
      ...product,
      nome: `${product.nome} Updated`,
      preco: product.preco + 100
    };

    ProductsService.create(product, adminToken).then((createResponse) => {
      const productId = createResponse.body._id;

      ProductsService.update(productId, updatedProduct, adminToken).then((updateResponse) => {
        expect(updateResponse.status).to.eq(200);
        expect(updateResponse.body.message).to.contain('Registro alterado');

        ProductsService.getById(productId).then((getResponse) => {
          expect(getResponse.status).to.eq(200);
          expect(getResponse.body.nome).to.eq(updatedProduct.nome);
          expect(getResponse.body.preco).to.eq(updatedProduct.preco);

          ProductsService.delete(productId, adminToken);
        });
      });
    });
  });

  it('deve impedir cadastro de produto com nome duplicado', () => {
    const product = buildProduct();

    ProductsService.create(product, adminToken).then((createResponse) => {
      expect(createResponse.status).to.eq(201);

      ProductsService.create(product, adminToken).then((duplicatedResponse) => {
        expect(duplicatedResponse.status).to.eq(400);
        expect(duplicatedResponse.body.message).to.contain('Já existe produto com esse nome');
        validateContract(errorSchema, duplicatedResponse.body);

        ProductsService.delete(createResponse.body._id, adminToken);
      });
    });
  });

  it('deve listar produtos dentro do tempo esperado', () => {
    ProductsService.list().then((response) => {
      expect(response.status).to.eq(200);
      expect(response.duration).to.be.lessThan(RESPONSE_TIME_SLA_MS);
      validateContract(productListSchema, response.body);
    });
  });

  it('deve retornar erro ao buscar produto inexistente', () => {
    const invalidId = 'id-inexistente-123';

    ProductsService.getById(invalidId).then((response) => {
      expect(response.status).to.eq(400);
    });
  });

  it('deve retornar erro ao criar produto sem autenticacao', () => {
    const product = buildProduct();

    ProductsService.create(product, null).then((response) => {
      expect(response.status).to.eq(401);
      validateContract(errorSchema, response.body);
    });
  });

  it('deve retornar erro ao criar produto com token invalido', () => {
    const product = buildProduct();
    const invalidToken = 'Bearer token-invalido-123';

    ProductsService.create(product, invalidToken).then((response) => {
      expect(response.status).to.eq(401);
      validateContract(errorSchema, response.body);
    });
  });

  it('deve retornar erro ao deletar produto sem autenticacao', () => {
    ProductsService.delete('qualquer-id', null).then((response) => {
      expect(response.status).to.eq(401);
      validateContract(errorSchema, response.body);
    });
  });
});
