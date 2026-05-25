export class HttpClient {
  static request({ method, url, body, headers = {}, failOnStatusCode = false }) {
    return cy.request({
      method,
      url,
      body,
      headers,
      failOnStatusCode
    });
  }

  static get(url, options = {}) {
    return this.request({ method: 'GET', url, ...options });
  }

  static post(url, body, options = {}) {
    return this.request({ method: 'POST', url, body, ...options });
  }

  static put(url, body, options = {}) {
    return this.request({ method: 'PUT', url, body, ...options });
  }

  static delete(url, options = {}) {
    return this.request({ method: 'DELETE', url, ...options });
  }
}
