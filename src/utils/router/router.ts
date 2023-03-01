import { routing } from './typesOfRout';

interface IRouter {
  onupdate: (index: number) => void;
  changePages: () => void;
  changePagesAut: () => void;
  access: () => boolean;
}

export class Router {
  onupdate: (index: number) => void;
  changePages: () => void;
  changePagesAut: () => void;
  chengedPages: boolean;
  access: () => boolean;

  constructor(prop: IRouter) {
    this.onupdate = prop.onupdate;
    this.changePages = prop.changePages;
    this.changePagesAut = prop.changePagesAut;
    this.chengedPages = false;
    this.access = prop.access;
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

    if (this.access() && !this.chengedPages) {
      this.changePages();
      this.chengedPages = true;
    }

    if (pageIndex > -1 && this.access()) {
      localStorage.setItem('query', path);

      this.onupdate(pageIndex);
    } else {
      this.changePagesAut();
      this.chengedPages = false;
    }
  }
}
