
class ApiClient {

  get endpoint() {
    return 'http://localhost/json';
  }

  get uri() {
    return '/sites/default/mercury-demo/about/index.html';
  }

  get params() {
    return '?content&locale=en&fallbackLocale=true&wrapper=true'
  }

  get url() {
    return this.endpoint + this.uri + this.params;
  }
}

export default ApiClient;
