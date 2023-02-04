import { svgStore } from '../../assets/svgStore';
import { BaseComponent } from '../base/baseComponent';

export class SideBar extends BaseComponent {
  root: HTMLElement;
  constructor(root: HTMLElement) {
    super();
    this.root = root;
    this.render();
  }
  render() {
    const sideBar = this.createElem('aside', 'h-[81.6vh] bg-sky-400');
    const container = this.createElem('div', 'flex items-center flex-col text-white bg-sky-400');
    const sideData = [
      {
        text: 'Overview',
        hash: '#overview',
        img: svgStore.overview,
        class: 'button__overview',
      },
      {
        text: 'Transaction',
        hash: '#transaction',
        img: svgStore.transaction,
        class: 'button__transaction',
      },
      {
        text: 'Report',
        hash: '#report',
        img: svgStore.report,
        class: 'button__report',
      },
      {
        text: 'Calendar',
        hash: '#calendar',
        img: svgStore.calendar,
        class: 'button__calendar',
      },
      {
        text: 'Settings',
        hash: '#settings',
        img: svgStore.settings,
        class: 'button__settings',
      },
    ];
    sideData.forEach((item, index) => {
      const sideBarItem = this.createElem(
        'button',
        `${item.class} sideBar__item flex items-center flex-col justify-center w-24 h-32 border-t-2 hover:scale-105 hover:transition-all hover:bg-sky-600 active:scale-100`
      );
      const sideBarItemImg = this.createElem('div', 'button__img w-14 h-14');
      sideBarItemImg.innerHTML = item.img;
      const sideBarItemText = this.createElem('button', 'button__text mt-2', item.text);
      sideBarItem.addEventListener('click', () => {
        location.hash = item.hash;
      });
      sideBarItem.addEventListener('click', () => {
        document.querySelectorAll('.sideBar__item').forEach((item) => {
          item.classList.remove('bg-sky-600');
          item.classList.add('hover:scale-105');
        });
        sideBarItem.classList.add('bg-sky-600');
        sideBarItem.classList.remove('hover:scale-105');
      });
      if (index === 4) {
        sideBarItem.classList.add('border-b-2');
      }
      if (index === 0) {
        sideBarItem.classList.add('bg-sky-600');
        sideBarItem.classList.remove('hover:scale-105');
      }
      sideBarItem.append(sideBarItemImg, sideBarItemText);
      container.appendChild(sideBarItem);
      sideBar.appendChild(container);
    });

    this.root.appendChild(sideBar);
  }
}
