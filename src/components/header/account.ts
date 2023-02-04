import { BaseComponent } from '../base/baseComponent';

export class Account extends BaseComponent {
  root: HTMLElement;
  constructor(root: HTMLElement) {
    super();
    this.root = root;
    this.render();
  }
  render() {
    const account = this.createElem('div', 'flex items-center logo text-xl relative');
    const accountImg = this.createElem('div', 'account__img ml-2 text-white w-14 h-14');
    accountImg.innerHTML = `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 1000 1000" enable-background="new 0 0 1000 1000" xml:space="preserve">
      <g><path fill='#ffffff' d="M500,559.4c-109.5,0-198.6-89.1-198.6-198.7c0-109.5,89.1-198.6,198.6-198.6c109.5,0,198.6,89.1,198.6,198.6C698.6,470.3,609.5,559.4,500,559.4z M500,203.3c-86.8,0-157.4,70.6-157.4,157.5c0,86.9,70.6,157.5,157.4,157.5c86.8,0,157.5-70.6,157.5-157.5C657.4,273.9,586.8,203.3,500,203.3z"/><path fill='#ffffff' d="M812.7,870.9c-11.4,0-20.6-9.2-20.6-20.6c0-160.5-131-291.1-292.1-291.1c-161,0-292,130.6-292,291.1c0,11.4-9.2,20.6-20.6,20.6c-11.4,0-20.6-9.2-20.6-20.6C166.8,667.1,316.3,518,500,518c183.7,0,333.3,149.1,333.3,332.3C833.2,861.7,824,870.9,812.7,870.9z"/><path fill='#ffffff' d="M500,990C229.8,990,10,770.2,10,500C10,229.8,229.8,10,500,10c270.1,0,490,219.8,490,490C990,770.2,770.2,990,500,990z M500,51.2C252.5,51.2,51.2,252.5,51.2,500c0,247.5,201.3,448.8,448.9,448.8c247.5,0,448.8-201.3,448.8-448.8C948.8,252.5,747.5,51.2,500,51.2z"/></g>
      </svg>`;
    const accountSwich = this.createElem(
      'div',
      'account__switch ml-1 text-white hover:cursor-pointer hover:scale-110 transition-all',
      '▼'
    );
    accountSwich.addEventListener('click', () => {
      popup.classList.toggle('hidden');
      accountSwich.classList.toggle('rotate-180');
    });
    const popup = this.createElem(
      'div',
      'w-64 h-96 bg-white rounded-lg absolute -bottom-96 right-2 border-2 hidden p-4'
    );
    const popupName = this.createElem('div', 'popup__name mb-4', 'Noname Noname');
    const popupLocation = this.createElem('div', 'popup__location', 'Amsterdam, Mars');
    const popupClose = this.createElem(
      'div',
      'popup__close absolute cursor-pointer text-3xl right-3 top-0 hover:scale-110',
      '×'
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
