import { BaseComponent } from '../base/baseComponent';
import { sideData } from '../base/baseData';

export class SideBar extends BaseComponent {
  node: HTMLElement;
  buttonsList: HTMLElement[] = [];
  constructor() {
    super();

    this.node = this.render();
  }
  render(): HTMLElement {
    const sideBar = this.createElem(
      'aside',
      'sidebar min-h-[81.6vh] bg-sky-400 rounded-r-lg border-0 dark:bg-gray-800',
    );
    const container = this.createElem(
      'div',
      'flex items-center flex-col text-white bg-transparent rounded-r-lg',
    );

    this.buttonsList.splice(0, this.buttonsList.length);

    sideData.forEach((item, index) => {
      const sideBarItem = this.createElem(
        'button',
        `${item.class} sideBar__item flex items-center flex-col justify-center w-24 h-32 hover:rounded hover:transition-all hover:bg-sky-600 dark:hover:bg-stone-500 active:scale-95`,
      );
      const sideBarItemImg = this.createElem('div', 'button__img w-12 h-12');

      sideBarItemImg.innerHTML = item.img;
      const sideBarItemText = this.createElem(
        'button',
        'button__text mt-2',
        this.textTranslate(`Sidebar.${item.text}`),
      );

      sideBarItem.addEventListener('click', () => {
        if (location.pathname.slice(1) !== item.hash.slice(1)) {
          location.hash = item.hash;
        }
      });

      if (index === 4) {
        sideBarItem.classList.add('rounded-br-lg');
      }

      if (index === 0) {
        sideBarItem.classList.add('bg-sky-600', 'rounded-tr-lg');
        // sideBarItem.classList.remove('hover:scale-105');
      }

      sideBarItem.append(sideBarItemImg, sideBarItemText);

      this.buttonsList.push(sideBarItem);
      container.appendChild(sideBarItem);
      sideBar.appendChild(container);
    });

    return sideBar;
  }

  update(): void {
    const node = this.render();

    this.node.replaceWith(node);

    this.node = node;
  }

  buttonActive(index: number): void {
    this.buttonsList.forEach((buttonsList) => {
      buttonsList.classList.remove('bg-sky-600');
      buttonsList.classList.remove('dark:bg-stone-500');
      // buttonsList.classList.add('hover:scale-105');
    });

    const activeButton: HTMLElement | undefined = this.buttonsList[index];

    if (activeButton !== undefined) {
      activeButton.classList.add('bg-sky-600');
      activeButton.classList.add('dark:bg-stone-500');
      // activeButton.classList.remove('hover:scale-105');
    }
  }
}
