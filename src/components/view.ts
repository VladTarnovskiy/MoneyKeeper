import type { ISetting, ITransaction, PostJsonResponse } from '@/components/model/types';
import { Authorization } from '@/components/pages/authorization/Authorization';

import { BaseComponent } from './base/baseComponent';
import { Footer } from './footer/footer';
import { Header } from './header/header';
import { Main } from './main/main';

interface IView {
  onLogin: <T, D = object>(data: D) => Promise<PostJsonResponse<T>>;
  onRegistration: <T, D = object>(data: D) => Promise<PostJsonResponse<T>>;
  onSetting: <ISettingReq>(dataU: ISetting) => Promise<PostJsonResponse<ISettingReq>>;
  onGetUser: <T>() => Promise<PostJsonResponse<T>>;
  onSetTransaction: <ITransactionReq>(
    dataU: ITransaction,
  ) => Promise<PostJsonResponse<ITransactionReq>>;
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
    this.main = new Main(this.bodyPage, {
      onSetTransaction: prop.onSetTransaction,
    });
    this.footer = new Footer(this.bodyPage);
    this.root.append(this.autorPage);
    this.authorization = new Authorization(this.autorPage, {
      onLogin: prop.onLogin,
      onRegistration: prop.onRegistration,
      onSetting: prop.onSetting,
      onGetUser: prop.onGetUser,
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
