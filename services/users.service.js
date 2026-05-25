import { HttpClient } from './httpClient';

export class UsersService {
  static list() {
    return HttpClient.get('/usuarios');
  }

  static getById(userId) {
    return HttpClient.get(`/usuarios/${userId}`);
  }

  static create(user) {
    return HttpClient.post('/usuarios', user);
  }

  static update(userId, user) {
    return HttpClient.put(`/usuarios/${userId}`, user);
  }

  static delete(userId) {
    return HttpClient.delete(`/usuarios/${userId}`);
  }
}
