import { HttpClient } from './httpClient';
require('dotenv').config();

export class AuthService {
  static login(credentials = {}) {
    const payload = {
      email: credentials.email || process.env.DEFAULT_EMAIL || 'admin@serverest.dev',
      password: credentials.password || process.env.DEFAULT_PASSWORD || 'teste'
    };

    return HttpClient.post('/login', payload);
  }
}
