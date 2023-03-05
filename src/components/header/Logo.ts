import logoAssets from '@/assets/logo.png';

import { BaseComponent } from '../base/baseComponent';

export class Logo extends BaseComponent {
  node: HTMLElement;
  constructor() {
    super();
    this.node = this.build();
  }
  build(): HTMLElement {
    const logo = this.createElem('div', 'flex items-center logo');
    const logoImg = this.createElem(
      'img',
      'logo__img h-16 w-16 hover:scale-110 hover:cursor-pointer hover:transition-all hover:rotate-180 active:scale-100',
    );

    logoImg.setAttribute('src', logoAssets);
    logoImg.addEventListener('click', () => {
      if (location.pathname !== '/overview') {
        location.hash = '#overview';
      }
    });
    const logoTitle = this.createElem(
      'div',
      'logo__title ml-4 text-2xl text-sky-600 font-semibold md:hidden',
      `${this.textTranslate('Header.logo')}`,
    );

    logo.append(logoImg, logoTitle);

    return logo;
  }
}
