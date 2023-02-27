import { routing } from './typesOfRout';

interface IRouter {
  onupdate: (index: number) => void;
  changePages: () => void;
  changePagesAut: () => void;
  access: () => boolean;
  setFalseAccess: () => void;
}

export class Router {
  onupdate: (index: number) => void;
  changePages: () => void;
  changePagesAut: () => void;
  chengedPages: boolean;
  access: () => boolean;
  setFalseAccess: () => void;

  constructor(prop: IRouter) {
    this.onupdate = prop.onupdate;
    this.changePages = prop.changePages;
    this.changePagesAut = prop.changePagesAut;
    this.chengedPages = false;
    this.access = prop.access;
    this.setFalseAccess = prop.setFalseAccess;
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

    if (path === '/signup') {
      this.chengedPages = false;
      this.setFalseAccess();
    }

    if (this.access() && !this.chengedPages) {
      this.changePages();
      this.chengedPages = true;
    }

    if (pageIndex > -1 && this.access()) {
      localStorage.setItem('query', path);
      this.onupdate(pageIndex);
    } else {
      this.changePagesAut();
    }

    // else {
    //   this.changePages();
    //   // this.chengedPages = true;
    // }
    //  else {
    //   this.onupdate('error', 0);
    // localStorage.setItem('query', '/404');
    // }
  }
}
