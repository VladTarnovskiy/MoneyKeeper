import { routing } from './typesOfRout';

interface IRouter {
  onupdate: (index: number) => void;
  changePages: () => void;
}

export class Router {
  onupdate: (index: number) => void;
  changePages: () => void;
  chengedPages: boolean;

  constructor(prop: IRouter) {
    this.onupdate = prop.onupdate;
    this.changePages = prop.changePages;
    this.chengedPages = false;
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
    const singIn: string | null = localStorage.getItem('userdata');

    if (Boolean(singIn) && !this.chengedPages) {
      this.changePages();
      this.chengedPages = true;
    }

    if (pageIndex > -1 && Boolean(singIn)) {
      localStorage.setItem('query', path);
      this.onupdate(pageIndex);
    }
    //  else {
    //   this.onupdate('error', 0);
    // localStorage.setItem('query', '/404');
    // }
  }
}
