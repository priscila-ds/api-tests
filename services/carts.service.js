import { HttpClient } from './httpClient';

export class CartsService {
  static list() {
    return HttpClient.get('/carrinhos');
  }

  static getById(cartId) {
    return HttpClient.get(`/carrinhos/${cartId}`);
  }

  static create(cart, token) {
    return HttpClient.post('/carrinhos', cart, {
      headers: { Authorization: token }
    });
  }

  static delete(cartId, token) {
    return HttpClient.delete(`/carrinhos/${cartId}`, {
      headers: { Authorization: token }
    });
  }

  static cancel(token) {
    return HttpClient.delete('/carrinhos/cancelar-compra', {
      headers: { Authorization: token }
    });
  }

  static conclude(token) {
    return HttpClient.delete('/carrinhos/concluir-compra', {
      headers: { Authorization: token }
    });
  }
}
