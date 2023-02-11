import type { Model } from '@/components/model/model';
import type { View } from '@/components/view';

import type { Router } from '@/utils/router';

export class Controller {
  private router: Router;
  view: View;
  model: Model;

  constructor(model: Model, view: View, router: Router) {
    this.view = view;
    this.router = router;
    this.model = model;
  }

  addQueryListener(): void {
    this.router.queryListener();
  }

  getDataFromModel(): string {
    return 'data from model';
  }

  checkRestartPage(): void {
    const { query } = localStorage;

    if (query) {
      history.pushState(null, '', `${location.origin}${query}`);
    } else {
      history.pushState(null, '', `${location.origin}/signup`);
    }

    this.router.routeCallback();
  }
}
