import { BaseComponent } from '../base/baseComponent';

export class Logo extends BaseComponent {
  root: HTMLElement;
  constructor(root: HTMLElement) {
    super();
    this.root = root;
    this.render();
  }
  render() {
    const logo = this.createElem('div', 'flex items-center logo');
    const logoImg = this.createElem(
      'img',
      'w-20 h-20 logo__img hover:cursor-pointer hover:scale-110 hover:transition-all active:scale-100'
    );
    logoImg.setAttribute('src', './assets/logo.png');
    logoImg.addEventListener('click', () => {
      location.hash = '#overview';
    });
    const logoTitle = this.createElem('div', 'logo__title ml-2 text-3xl text-white', 'MoneyKeeper');
    logo.append(logoImg, logoTitle);
    this.root.appendChild(logo);
  }
}
