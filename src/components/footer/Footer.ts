import rsLogoAssets from '@/assets/rs-school-js.svg';

import { BaseComponent } from '../base/baseComponent';

export class Footer extends BaseComponent {
  node: HTMLElement;

  constructor() {
    super();
    this.node = this.render();
  }

  render(): HTMLElement {
    const container = this.createElem(
      'footer',
      ' container mx-auto flex justify-around items-center p-3 text-sky-600 pt-[30px]',
    );
    const rsImg = this.createElem(
      'a',
      'block w-20 h-8 bg-contain bg-no-repeat rs__img hover:cursor-pointer hover:scale-110 hover:transition-all active:scale-100 sm:hidden',
    );

    rsImg.setAttribute(
      'href',
      'https://github.com/rolling-scopes-school/tasks/blob/master/tasks/rsclone/rsclone.md',
    );
    rsImg.style.backgroundImage = `url(${rsLogoAssets})`;
    const productionDate = this.createElem(
      'div',
      'account__img text-xl text-sky-600 dark:font-semibold dark:text-stone-600 font-light h-fit',
      '©2023',
    );
    const gitImages = this.createElem('div', 'flex justify-between');
    const rsImgOne = this.createElem(
      'a',
      'block w-8 h-8 bg-contain rounded-full mr-[-8px] bg-no-repeat rs__img hover:cursor-pointer hover:scale-110 hover:transition-all active:scale-100',
    );

    rsImgOne.setAttribute('href', 'https://github.com/IgorMotorin');
    rsImgOne.style.backgroundImage = `url(https://avatars.githubusercontent.com/u/70837544?v=4)`;
    const rsImgTwo = this.createElem(
      'a',
      'block w-8 h-8 bg-contain rounded-full mr-[-8px] bg-no-repeat rs__img hover:cursor-pointer hover:scale-110 hover:transition-all active:scale-100',
    );

    rsImgTwo.setAttribute('href', 'https://github.com/VladTarnovskiy');
    rsImgTwo.style.backgroundImage = `url(https://avatars.githubusercontent.com/u/93903876?v=4)`;
    const rsImgThree = this.createElem(
      'a',
      'block w-8 h-8 bg-contain rounded-full bg-no-repeat rs__img hover:cursor-pointer hover:scale-110 hover:transition-all active:scale-100',
    );

    rsImgThree.setAttribute('href', 'https://github.com/DenisKa13051992');
    rsImgThree.style.backgroundImage = `url(https://avatars.githubusercontent.com/u/106694274?v=4)`;
    gitImages.append(rsImgOne, rsImgTwo, rsImgThree);
    container.append(gitImages, productionDate, rsImg);

    return container;
  }
}
