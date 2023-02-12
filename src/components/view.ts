import type { PostJsonResponse } from '@/components/model/types';
import { Authorization } from '@/components/pages/authorization/Authorization';

import { BaseComponent } from './base/baseComponent';
import { Footer } from './footer/footer';
import { Header } from './header/header';
import { Main } from './main/main';

interface IView {
  onlogin: <T, D = object>(data: D) => Promise<PostJsonResponse<T>>;
  onregistration: <T, D = object>(data: D) => Promise<PostJsonResponse<T>>;
}

export class View extends BaseComponent {
  root: HTMLElement;
  header: Header;
  main: Main;
  footer: Footer;
  authorization: Authorization;
  bodyPage: HTMLElement;
  autorPage: HTMLElement;

  constructor(prop: IView) {
    super();
    this.root = document.body;
    this.bodyPage = this.createElem('div', 'bodyPage');
    this.autorPage = this.createElem('div', 'autorPage');
    this.header = new Header(this.bodyPage);
    this.main = new Main(this.bodyPage);
    this.footer = new Footer(this.bodyPage);
    this.root.append(this.autorPage);
    this.authorization = new Authorization(this.autorPage, {
      onlogin: prop.onlogin,
      onregistration: prop.onregistration,
    });
  }

  changePages(): void {
    this.root.replaceChild(this.bodyPage, this.autorPage);
  }

  render(): void {
    this.header.render();
    this.main.render();
    this.footer.render();
  }
}
