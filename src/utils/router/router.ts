import { routing } from './typesOfRout';

import type { Controller } from '../controller';

export class Router {
  controller: Controller;

  constructor(controller: Controller) {
    this.controller = controller;
  }

  queryListener(): void {
    window.addEventListener('popstate', () => {
      if (location.href.includes('#')) {
        history.replaceState(null, '', `${location.origin}/${location.hash.slice(1)}`);
      }

      this.routeCallback();
    });
  }

  routeCallback(): void {
    const path = location.pathname;
    const pageIndex = routing.indexOf(path);

    if (pageIndex > -1) {
      localStorage.query = path;
      this.controller.view.main.updateMain(path, pageIndex);
    } else {
      this.controller.view.main.updateMain('eror', 0);
      localStorage.query = '/404';
    }
  }
}
