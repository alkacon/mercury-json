
class ApiClient {

  static get SERVER() {
    return 'http://localhost';
  }

  get endpoint() {
    return ApiClient.SERVER + '/json';
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
