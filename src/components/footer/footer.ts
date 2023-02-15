import githubLogoAssets from '@/assets/github.svg';
import rsLogoAssets from '@/assets/rs-school-js.svg';

import { BaseComponent } from '../base/baseComponent';

export class Footer extends BaseComponent {
  root: HTMLElement;

  constructor(root: HTMLElement) {
    super();
    this.root = root;
  }

  render(): void {
    const container = this.createElem(
      'footer',
      ' container mx-auto flex justify-around items-center p-3 text-sky-600',
    );
    const rsImg = this.createElem(
      'a',
      'block w-32 h-8 bg-contain bg-no-repeat rs__img hover:cursor-pointer hover:scale-110 hover:transition-all active:scale-100 sm:hidden',
    );

    rsImg.setAttribute(
      'href',
      'https://github.com/rolling-scopes-school/tasks/blob/master/tasks/rsclone/rsclone.md',
    );
    rsImg.style.backgroundImage = `url(${rsLogoAssets})`;
    const productionDate = this.createElem(
      'div',
      'account__img text-xl text-sky-600 font-light h-fit',
      '©2023',
    );
    const gitImages = this.createElem('div', 'flex justify-between');
    const rsImgOne = this.createElem(
      'a',
      'block w-10 h-10 bg-contain mr-2 bg-no-repeat rs__img hover:cursor-pointer hover:scale-110 hover:transition-all active:scale-100',
    );

    rsImgOne.setAttribute('href', 'https://github.com/IgorMotorin');
    rsImgOne.style.backgroundImage = `url(${githubLogoAssets})`;
    const rsImgTwo = this.createElem(
      'a',
      'block w-10 h-10 bg-contain mr-2 bg-no-repeat rs__img hover:cursor-pointer hover:scale-110 hover:transition-all active:scale-100',
    );

    rsImgTwo.setAttribute('href', 'https://github.com/VladTarnovskiy');
    rsImgTwo.style.backgroundImage = `url(${githubLogoAssets})`;
    const rsImgThree = this.createElem(
      'a',
      'block w-10 h-10 bg-contain bg-no-repeat rs__img hover:cursor-pointer hover:scale-110 hover:transition-all active:scale-100',
    );

    rsImgThree.setAttribute('href', 'https://github.com/DenisKa13051992');
    rsImgThree.style.backgroundImage = `url(${githubLogoAssets})`;
    gitImages.append(rsImgOne, rsImgTwo, rsImgThree);
    container.append(gitImages, productionDate, rsImg);
    this.root.appendChild(container);
  }
}
