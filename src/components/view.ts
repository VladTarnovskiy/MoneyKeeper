import type { Model } from '@/components/model/model';
// import type { ISetting, ITransaction, PostJsonResponse } from '@/components/model/types';
import { Authorization } from '@/components/pages/authorization/Authorization';

import { BaseComponent } from './base/baseComponent';
import { Footer } from './footer/footer';
import { Header } from './header/header';
import { Main } from './main/main';

// interface IView {
//   onlogin: <T, D = object>(data: D) => Promise<PostJsonResponse<T>>;
//   onregistration: <T, D = object>(data: D) => Promise<PostJsonResponse<T>>;
//   onsetting: <ISettingReq>(dataU: ISetting) => Promise<PostJsonResponse<ISettingReq>>;
//   ongetuser: <T>() => Promise<PostJsonResponse<T>>;
//   onsettransaction: <ITransactionReq>(
//     dataU: ITransaction,
//   ) => Promise<PostJsonResponse<ITransactionReq>>;
// }

export class View extends BaseComponent {
  root: HTMLElement;
  header: Header;
  main: Main;
  footer: Footer;
  authorization: Authorization;
  bodyPage: HTMLElement;
  autorPage: HTMLElement;
  model: Model;

  constructor(model: Model) {
    super();
    this.root = document.body;
    this.bodyPage = this.createElem('div', 'bodyPage');
    this.autorPage = this.createElem('div', 'autorPage');
    this.header = new Header(this.bodyPage);
    this.model = model;
    this.main = new Main(
      this.bodyPage,
      {
        onsettransaction: model.registerUser.bind(model),
      },
      this.model,
    );
    this.footer = new Footer(this.bodyPage);
    this.root.append(this.autorPage);
    this.authorization = new Authorization(this.autorPage, {
      onlogin: model.loginUser.bind(model),
      onregistration: model.registerUser.bind(model),
      onsetting: model.setSettings.bind(model),
      ongetuser: model.getUser.bind(model),
      // onlogin: model.loginUser.bind(model),
      // onregistration: model.registerUser.bind(model),
      // onsetting: model.setSettings.bind(model),
      // ongetuser: model.getUser.bind(model),
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
