import { routing } from './typesOfRout';

interface IRouter {
  onupdate: (index: number) => void;
  changePages: () => void;
  access: () => boolean;
}

export class Router {
  onupdate: (index: number) => void;
  changePages: () => void;
  chengedPages: boolean;
  access: () => boolean;

  constructor(prop: IRouter) {
    this.onupdate = prop.onupdate;
    this.changePages = prop.changePages;
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
    // const singIn: string | null = localStorage.getItem('signIn');

    // console.log(this.access());

    if (this.access() && !this.chengedPages) {
      this.changePages();
      this.chengedPages = true;
    }

    if (pageIndex > -1 && this.access()) {
      localStorage.setItem('query', path);
      this.onupdate(pageIndex);
    }
    //  else {
    //   this.onupdate('error', 0);
    // localStorage.setItem('query', '/404');
    // }
  }
}
