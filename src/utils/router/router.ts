import { routing } from './typesOfRout';

interface IRouter {
  onupdate: (main: string, index: number) => void;
  changePages: () => void;
}

export class Router {
  onupdate: (main: string, index: number) => void;
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
    let singIn: boolean
    if (localStorage.signIn) {singIn = localStorage.signIn;}
    else singIn = false
    if (singIn && !this.chengedPages) {this.changePages(); this.chengedPages = true;}
    if (pageIndex > -1 && singIn) {
      localStorage.query = path;
      this.onupdate(path, pageIndex);
    }
    //  else {
    //   this.onupdate('error', 0);
    //   localStorage.query = '/404';
    // }
  }
}
