import i18next from 'i18next';

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
    this.initLanguage().catch((err: string) => new Error(err));
  }

  async initLanguage(): Promise<void> {
    await this.model.getSettings();

    // console.log(this.model.setting[0]?.lang)
    this.model.setting[0]?.lang === 'EN'
      ? i18next.changeLanguage('en').catch((err: string) => new Error(err))
      : i18next.changeLanguage('ru').catch((err: string) => new Error(err));

    this.render();
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
    this.header.update();
    this.main.update();
    // this.footer.render();
  }
  // update(): void {

  // }

  updateHeaderSum(): void {
    this.header.update();
  }
}
