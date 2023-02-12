import { BaseComponent } from '../base/baseComponent';
import { sideData } from '../base/baseData';

export class SideBar extends BaseComponent {
  root: HTMLElement;
  buttonsList: HTMLElement[] = [];
  constructor(root: HTMLElement) {
    super();

    this.root = root;
    this.render();
  }
  render(): void {
    const sideBar = this.createElem('aside', 'min-h-[81.6vh] bg-sky-400');
    const container = this.createElem('div', 'flex items-center flex-col text-white bg-sky-400');

    sideData.forEach((item, index) => {
      const sideBarItem = this.createElem(
        'button',
        `${item.class} sideBar__item flex items-center flex-col justify-center w-24 h-32 border-t-2 hover:scale-105 hover:transition-all hover:bg-sky-600 active:scale-100`,
      );
      const sideBarItemImg = this.createElem('div', 'button__img w-14 h-14');

      sideBarItemImg.innerHTML = item.img;
      const sideBarItemText = this.createElem('button', 'button__text mt-2', item.text);

      sideBarItem.addEventListener('click', () => {
        if (location.pathname.slice(1) !== item.hash.slice(1)) {
          location.hash = item.hash;
        }
      });

      if (index === 4) {
        sideBarItem.classList.add('border-b-2');
      }

      if (index === 0) {
        sideBarItem.classList.add('bg-sky-600');
        sideBarItem.classList.remove('hover:scale-105');
      }

      sideBarItem.append(sideBarItemImg, sideBarItemText);
      this.buttonsList.push(sideBarItem);
      container.appendChild(sideBarItem);
      sideBar.appendChild(container);
    });

    this.root.appendChild(sideBar);
  }

  buttonActive(index: number): void {
    this.buttonsList.forEach((buttonsList) => {
      buttonsList.classList.remove('bg-sky-600');
      buttonsList.classList.add('hover:scale-105');
    });

    const activeButton: HTMLElement | undefined = this.buttonsList[index];

    if (activeButton !== undefined) {
      activeButton.classList.add('bg-sky-600');
      activeButton.classList.remove('hover:scale-105');
    }
  }
}
