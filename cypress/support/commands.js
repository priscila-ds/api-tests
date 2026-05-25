import { AuthService } from '../../services/auth.service';

Cypress.Commands.add('apiLogin', (credentials = {}) => {
  return AuthService.login(credentials).then((response) => response.body.authorization);
});
