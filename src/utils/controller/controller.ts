import { View } from '../../components/view';
import { Router } from '../router';

export class Controller {
  private router: Router;
  view: View;

  constructor() {
    this.view = new View();
    this.router = new Router(this);
  }

  addQueryListener(): void {
    this.router.queryListener();
  }

  getDataFromModel(): string {
    return 'data from model';
  }

  checkRestartPage(): void {
    const query: string = localStorage.query;
    if (query) {
      history.pushState(null, '', `${location.origin}${query}`);
    } else {
      history.pushState(null, '', `${location.origin}/signup`);
    }

    this.router.routeCallback();
  }
}
