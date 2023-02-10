import { routing } from './typesOfRout';

interface IRouter {
  onupdate: (main: string, index: number) => void;
}

export class Router {
  onupdate: (main: string, index: number) => void;

  constructor(prop: IRouter) {
    this.onupdate = prop.onupdate;
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
      // this.controller.view.main.updateMain(path, pageIndex);
      this.onupdate(path, pageIndex);
    } else {
      // this.controller.view.main.updateMain('eror', 0);
      this.onupdate('error', 0);
      localStorage.query = '/404';
    }
  }
}
