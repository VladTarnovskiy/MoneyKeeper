import { calendar } from '../../../assets/svgStore';
import { BaseComponent } from '../../base/baseComponent';

export class PeriodItem extends BaseComponent {
  root: HTMLElement;
  color: string;
  title: string;
  date: string;
  constructor(root: HTMLElement, color: string, title: string, date: string) {
    super();
    this.root = root;
    this.color = color;
    this.title = title;
    this.date = date;
    this.render();
  }
  render(): void {
    const container = this.createElem(
      'div',
      'period__container items-center border-b-2 p-1 mb-4 flex',
    );
    const periodImg = this.createElem('div', 'relative period__img w-14 h-14');
    const periodImgDescript = this.createElem(
      'div',
      'absolute -translate-x-1/2 -translate-y-1/2 left-1/2 top-8 period__img_descript text-2xl font-semibold text-stone-900',
      this.date,
    );

    periodImg.innerHTML = calendar(this.color);
    periodImg.appendChild(periodImgDescript);
    const periodDescription = this.createElem('div', 'period__description grow ml-2 flex flex-col');
    const periodItemTitle = this.createElem(
      'div',
      'period__item_title text-2xl text-stone-900 mb-1',
      this.title,
    );

    const graphItemOne = this.createElem(
      'div',
      'graph__item w-full items-center text-sky-500 font-light flex gap-2',
    );
    const graphItemTitleOne = this.createElem('div', 'graph__item_title w-16', 'Income:');
    const graphItemProgressOne = this.createElem('div', 'graph__item_progress h-4 grow');
    const progressOneChecker = this.createElem('div', 'graph__item_checker h-4 w-full');

    progressOneChecker.style.backgroundColor = this.color;
    graphItemProgressOne.appendChild(progressOneChecker);
    const graphItemSumOne = this.createElem('div', 'graph__item_sum w-16 text-right', '1000 $');

    graphItemOne.append(graphItemTitleOne, graphItemProgressOne, graphItemSumOne);

    const graphItemTwo = this.createElem(
      'div',
      'graph__item w-full items-center text-stone-600 font-light flex gap-2',
    );
    const graphItemTitleTwo = this.createElem('div', 'graph__item_title w-16', 'Expence:');
    const graphItemProgressTwo = this.createElem('div', 'graph__item_progress h-4 grow');
    const progressTwoChecker = this.createElem('div', 'graph__item_checker h-4 w-full');

    progressTwoChecker.style.backgroundColor = this.color;
    graphItemProgressTwo.appendChild(progressTwoChecker);
    const graphItemSumTwo = this.createElem('div', 'graph__item_sum w-16 text-right', '1000 $');

    graphItemTwo.append(graphItemTitleTwo, graphItemProgressTwo, graphItemSumTwo);

    periodDescription.append(periodItemTitle, graphItemOne, graphItemTwo);
    container.append(periodImg, periodDescription);
    this.root.appendChild(container);
  }
}
