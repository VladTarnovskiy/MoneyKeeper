import i18next from 'i18next';

import type { Model } from '@/components/model/model';
import { Authorization } from '@/components/pages/authorization/Authorization';

import { BaseComponent } from './base/baseComponent';
import { Footer } from './footer/Footer';
import { Header } from './header/Header';
import { Main } from './main/Main';

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
    this.bodyPage = this.createElem('div', 'bodyPage dark:bg-gray-400');
    this.authorPage = this.createElem('div', 'authorPage');
    this.header = new Header(model);
    this.main = new Main(model, this.updateHeaderSum.bind(this));
    this.main.settings.updateView = this.render.bind(this);
    this.footer = new Footer();
    this.bodyPage.append(this.header.node, this.main.node, this.footer.node);
    this.root.append(this.authorPage);
    this.authorization = new Authorization(model);
    this.authorPage.append(this.authorization.node);
  }

  initSetting(): void {
    this.model.setting[0]?.lang === 'EN'
      ? i18next.changeLanguage('en').catch((err: string) => new Error(err))
      : i18next.changeLanguage('ru').catch((err: string) => new Error(err));

    document.body.className = String(this.model.setting[0]?.theme.toLowerCase());

    this.model.setCurrency(this.model.setting[0]?.currency ?? '');
  }
  changePages(): void {
    this.root.replaceChild(this.bodyPage, this.authorPage);
    this.initSetting();
    this.render();
  }
  changePagesAut(): void {
    this.authorization.reset();
    this.authorization.update();
    this.bodyPage.replaceWith(this.authorPage);
  }

  render(): void {
    this.header.update();
    this.main.update();
  }

  updateHeaderSum(): void {
    this.header.update();
  }
}
