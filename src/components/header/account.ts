import type { Model } from '@/components/model/model';
import type { ISettingReq, IUserReq } from '@/components/model/types';

import { svgStore } from '../../assets/svgStore';
import { BaseComponent } from '../base/baseComponent';

export class Account extends BaseComponent {
  root: HTMLElement;
  model: Model;
  settings: ISettingReq | undefined;
  userData: IUserReq;

  constructor(root: HTMLElement, model: Model) {
    super();
    this.root = root;
    this.model = model;
    const userDataReq = localStorage.getItem('userdata');

    if (userDataReq === null || userDataReq.length === 0) {
      this.userData = {
        accessToken: 'string',
        user: {
          email: '',
          id: 0,
        },
      };
    } else {
      const userData = JSON.parse(userDataReq) as IUserReq;

      this.userData = userData;
      this.model
        .getSettings()
        .then(() => {
          this.settings = model.setting.find((item) => item.userId === userData.user.id);
        })

        .then(() => {
          this.render();
        })

        .catch((err: string) => new Error(err));
    }
  }
  render(): void {
    const account = this.createElem(
      'div',
      'flex items-center logo text-xl relative hover:cursor-pointer',
    );
    const accountImg = this.createElem('div', 'account__img ml-2 text-sky-600 w-8 h-8');

    accountImg.innerHTML = svgStore.account;
    const accountSwitch = this.createElem(
      'div',
      'account__switch ml-1 text-base text-sky-600 hover:scale-110 transition-all',
      '▼',
    );

    const popup = this.createElem(
      'div',
      'account_popup min-w-[260px] h-96 bg-white z-10 rounded-lg absolute -bottom-96 right-2 border-2 hidden p-4',
    );

    [accountImg, accountSwitch].forEach((item) => {
      item.addEventListener('click', () => {
        popup.classList.toggle('hidden');
        accountSwitch.classList.toggle('rotate-180');
      });
    });

    let name = this.model.setting[0]?.name;

    if (name === undefined) {
      name = '';
    }

    const popupName = this.createElem(
      'div',
      'popup__name mb-4',
      `${this.textTranslate('Header.username')}: ${name}`,
    );
    const popupLocation = this.createElem(
      'div',
      'popup__location',
      `${this.textTranslate('Header.mail')}: ${this.model.userData.user.email}`,
    );
    const popupClose = this.createElem(
      'div',
      'popup__close absolute cursor-pointer text-3xl right-3 top-0 hover:scale-110',
      '×',
    );

    popupClose.addEventListener('click', () => {
      popup.classList.add('hidden');
      accountSwitch.classList.remove('rotate-180');
    });
    popup.append(popupName, popupLocation, popupClose);
    account.append(accountImg, accountSwitch, popup);
    this.root.appendChild(account);
  }
}
