import { HttpClient } from './httpClient';

export class ProductsService {
  static list() {
    return HttpClient.get('/produtos');
  }

  static getById(productId) {
    return HttpClient.get(`/produtos/${productId}`);
  }

  static create(product, token) {
    return HttpClient.post('/produtos', product, {
      headers: { Authorization: token }
    });
  }

  static update(productId, product, token) {
    return HttpClient.put(`/produtos/${productId}`, product, {
      headers: { Authorization: token }
    });
  }

  static delete(productId, token) {
    return HttpClient.delete(`/produtos/${productId}`, {
      headers: { Authorization: token }
    });
  }
}
