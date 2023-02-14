import { svgStore } from '../../assets/svgStore';
import { BaseComponent } from '../base/baseComponent';

export class Account extends BaseComponent {
  root: HTMLElement;
  constructor(root: HTMLElement) {
    super();
    this.root = root;
    this.render();
  }
  render(): void {
    const account = this.createElem('div', 'flex items-center logo text-xl relative');
    const accountImg = this.createElem('div', 'account__img ml-2 text-white w-10 h-10');

    accountImg.innerHTML = svgStore.account;
    const accountSwich = this.createElem(
      'div',
      'account__switch ml-1 text-base text-white hover:cursor-pointer hover:scale-110 transition-all',
      '▼',
    );

    const popup = this.createElem(
      'div',
      'w-64 h-96 bg-white z-10 rounded-lg absolute -bottom-96 right-2 border-2 hidden p-4',
    );

    accountSwich.addEventListener('click', () => {
      popup.classList.toggle('hidden');
      accountSwich.classList.toggle('rotate-180');
    });
    const popupName = this.createElem('div', 'popup__name mb-4', 'Noname Noname');
    const popupLocation = this.createElem('div', 'popup__location', 'Amsterdam, Mars');
    const popupClose = this.createElem(
      'div',
      'popup__close absolute cursor-pointer text-3xl right-3 top-0 hover:scale-110',
      '×',
    );

    popupClose.addEventListener('click', () => {
      popup.classList.add('hidden');
      accountSwich.classList.remove('rotate-180');
    });
    popup.append(popupName, popupLocation, popupClose);
    account.append(accountImg, accountSwich, popup);
    this.root.appendChild(account);
  }
}
