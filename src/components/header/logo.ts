import logoAssets from '@/assets/logo.png';

import { BaseComponent } from '../base/baseComponent';

export class Logo extends BaseComponent {
  root: HTMLElement;
  constructor(root: HTMLElement) {
    super();
    this.root = root;
    this.render();
  }
  render(): void {
    const logo = this.createElem('div', 'flex items-center logo');
    const logoImg = this.createElem(
      'img',
      'logo__img h-20 w-20 hover:scale-110 hover:cursor-pointer hover:transition-all active:scale-100',
    );

    logoImg.setAttribute('src', logoAssets);
    logoImg.addEventListener('click', () => {
      if (location.pathname !== '/overview') {
        location.hash = '#overview';
      }
    });
    const logoTitle = this.createElem(
      'div',
      'logo__title ml-2 text-3xl text-white font-semibold',
      `${this.textTranslate('overview.logo')}`,
    );

    logo.append(logoImg, logoTitle);
    this.root.appendChild(logo);
  }
}
