import { HttpClient } from './httpClient';

export class AuthService {
  static login(credentials = {}) {
    const payload = {
      email: credentials.email || 'admin@serverest.dev',
      password: credentials.password || 'teste'
    };

    return HttpClient.post('/login', payload);
  }
}
