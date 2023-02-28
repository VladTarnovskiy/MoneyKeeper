import type { Model } from '@/components/model/model';
import type { ISettingReq, IUserReq } from '@/components/model/types';
import { Button } from '@/components/pages/authorization/Button';

import { svgStore } from '../../assets/svgStore';
import { BaseComponent } from '../base/baseComponent';

export class Account extends BaseComponent {
  node: HTMLElement;
  model: Model;
  settings: ISettingReq | undefined;
  userData: IUserReq;

  constructor(model: Model) {
    super();

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
    }

    this.node = this.render();
  }
  render(): HTMLElement {
    const account = this.createElem(
      'div',
      'flex items-center logo text-xl relative pl-3 hover:cursor-pointer',
    );
    const accountImg = this.createElem('div', 'account__img ml-2 text-sky-600 w-11 h-11');

    accountImg.innerHTML = svgStore.account;
    const accountSwitch = this.createElem(
      'div',
      'account__switch ml-1 text-base text-sky-600 hover:scale-110 transition-all',
      '▼',
    );

    const popup = this.createElem(
      'div',
      'account_popup flex justify-end flex-col min-w-[260px] h-96 bg-white z-10 rounded-lg border-[1px] dark:bg-gray-300 absolute -bottom-96 right-2 hidden p-4 pt-7 shadow-lg shadow-stone-700/40',
    );

    [accountImg, accountSwitch].forEach((item) => {
      item.addEventListener('click', () => {
        popup.classList.toggle('hidden');
        accountSwitch.classList.toggle('rotate-180');
      });
    });

    let name = this.model.setting[0]?.name;
    const { email } = this.model.userData.user;

    if (name === undefined) {
      name = '';
    }

    const popupName = this.createElem('div', 'popup__name mb-4', name);
    const popupMail = this.createElem(
      'div',
      'popup__location h-full',
      `${this.textTranslate('Header.mail')}: ${email}`,
    );

    const accountExitBut = new Button({
      text: 'exit',
      onClick: this.onClick,
    }).node;

    const popupClose = this.createElem(
      'div',
      'popup__close absolute cursor-pointer text-3xl right-3 top-0 hover:scale-110',
      '×',
    );

    popupClose.addEventListener('click', () => {
      popup.classList.add('hidden');
      accountSwitch.classList.remove('rotate-180');
    });
    popup.append(popupName, popupMail, accountExitBut, popupClose);
    account.append(accountImg, accountSwitch, popup);

    return account;
  }

  onClick = (): void => {
    localStorage.removeItem('userdata');
    localStorage.removeItem('query');
    location.hash = '#signup';
  };
}
