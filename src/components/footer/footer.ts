import { BaseComponent } from '../base/baseComponent';

export class Footer extends BaseComponent {
  root: HTMLElement;
  container: HTMLElement;

  constructor(root: HTMLElement) {
    super();
    this.root = root;
    this.container = this.createElem(
      'footer',
      ' container mx-auto flex justify-around items-center border-t-2 p-3 bg-sky-400'
    );
    const rsImg = this.createElem(
      'a',
      'block w-32 h-12 rs__img hover:cursor-pointer hover:scale-110 hover:transition-all active:scale-100'
    );
    rsImg.setAttribute('href', 'https://github.com/rolling-scopes-school/tasks/blob/master/tasks/rsclone/rsclone.md');
    rsImg.style.backgroundImage = 'url(./assets/logo-rsschool3.png)';
    const productionDate = this.createElem('div', 'account__img text-xl text-white font-light h-fit', '©2023');
    const gitImages = this.createElem('div', 'flex justify-between');
    const rsImgOne = this.createElem(
      'a',
      'block w-12 h-12 rs__img hover:cursor-pointer hover:scale-110 hover:transition-all active:scale-100'
    );
    rsImgOne.setAttribute('href', 'https://github.com/IgorMotorin');
    rsImgOne.style.backgroundImage = 'url(./assets/github.svg)';
    const rsImgTwo = this.createElem(
      'a',
      'block w-12 h-12 rs__img hover:cursor-pointer hover:scale-110 hover:transition-all active:scale-100'
    );
    rsImgTwo.setAttribute('href', 'https://github.com/VladTarnovskiy');
    rsImgTwo.style.backgroundImage = 'url(./assets/github.svg)';
    const rsImgThree = this.createElem(
      'a',
      'block w-12 h-12 rs__img hover:cursor-pointer hover:scale-110 hover:transition-all active:scale-100'
    );
    rsImgThree.setAttribute('href', 'https://github.com/DenisKa13051992');
    rsImgThree.style.backgroundImage = 'url(./assets/github.svg))';
    gitImages.append(rsImgOne, rsImgTwo, rsImgThree);
    this.container.append(gitImages, productionDate, rsImg);
  }

  render() {
    this.root.appendChild(this.container);
  }
}
