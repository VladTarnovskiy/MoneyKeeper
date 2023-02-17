import type { Model } from '@/components/model/model';
import { Authorization } from '@/components/pages/authorization/Authorization';

import { BaseComponent } from './base/baseComponent';
import { Footer } from './footer/footer';
import { Header } from './header/header';
import { Main } from './main/main';

export class View extends BaseComponent {
  root: HTMLElement;
  header: Header;
  main: Main;
  footer: Footer;
  authorization: Authorization;
  bodyPage: HTMLElement;
  authorPage: HTMLElement;
  model: Model;

  constructor(model: Model) {
    super();
    this.root = document.body;
    this.model = model;
    this.bodyPage = this.createElem('div', 'bodyPage');
    this.authorPage = this.createElem('div', 'authorPage');
    this.header = new Header(this.bodyPage, model);
    this.main = new Main(this.bodyPage, model, this.updateHeaderSum.bind(this));
    this.footer = new Footer(this.bodyPage);
    this.root.append(this.authorPage);
    this.authorization = new Authorization(this.authorPage, model);
  }

  changePages(): void {
    this.root.replaceChild(this.bodyPage, this.authorPage);
  }
  changePagesAut(): void {
    this.authorization.reset();
    this.authorization.update();
    this.bodyPage.replaceWith(this.authorPage);
    // this.authorization.update();
  }

  render(): void {
    this.header.render();
    this.main.render();
    this.footer.render();
  }

  updateHeaderSum(): void {
    this.header.updateSum();
  }
}
