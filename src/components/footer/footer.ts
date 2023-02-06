import { BaseComponent } from '../base/baseComponent';
import '../../assets/rs-school-js.svg';
import '../../assets/github.svg';

export class Footer extends BaseComponent {
  root: HTMLElement;

  constructor(root: HTMLElement) {
    super();
    this.root = root;
  }

  render(): void {
    const container = this.createElem(
      'footer',
      ' container mx-auto flex justify-around items-center border-t-2 p-3 bg-sky-400',
    );
    const rsImg = this.createElem(
      'a',
      'block w-32 h-12 bg-contain bg-no-repeat rs__img hover:cursor-pointer hover:scale-110 hover:transition-all active:scale-100',
    );

    rsImg.setAttribute(
      'href',
      'https://github.com/rolling-scopes-school/tasks/blob/master/tasks/rsclone/rsclone.md',
    );
    rsImg.style.backgroundImage = 'url(./assets/rs-school-js.svg)';
    const productionDate = this.createElem(
      'div',
      'account__img text-xl text-white font-light h-fit',
      '©2023',
    );
    const gitImages = this.createElem('div', 'flex justify-between');
    const rsImgOne = this.createElem(
      'a',
      'block w-12 h-12 bg-contain mr-1 bg-no-repeat rs__img hover:cursor-pointer hover:scale-110 hover:transition-all active:scale-100',
    );

    rsImgOne.setAttribute('href', 'https://github.com/IgorMotorin');
    rsImgOne.style.backgroundImage = 'url(./assets/github.svg)';
    const rsImgTwo = this.createElem(
      'a',
      'block w-12 h-12 bg-contain mr-1 bg-no-repeat rs__img hover:cursor-pointer hover:scale-110 hover:transition-all active:scale-100',
    );

    rsImgTwo.setAttribute('href', 'https://github.com/VladTarnovskiy');
    rsImgTwo.style.backgroundImage = 'url(./assets/github.svg)';
    const rsImgThree = this.createElem(
      'a',
      'block w-12 h-12 bg-contain bg-no-repeat rs__img hover:cursor-pointer hover:scale-110 hover:transition-all active:scale-100',
    );

    rsImgThree.setAttribute('href', 'https://github.com/DenisKa13051992');
    rsImgThree.style.backgroundImage = "url('./assets/github.svg')";
    gitImages.append(rsImgOne, rsImgTwo, rsImgThree);
    container.append(gitImages, productionDate, rsImg);
    this.root.appendChild(container);
  }
}
