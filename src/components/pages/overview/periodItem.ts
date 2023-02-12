import { BaseComponent } from '@/components/base/baseComponent';
import { TransactionStatisticItem } from '@/components/base/statisticItem';

import { calendar } from '@/assets/svgStore';

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

    periodDescription.append(periodItemTitle);
    new TransactionStatisticItem(periodDescription, this.color, 'Income', '50', '3000$', 'sky-500');
    new TransactionStatisticItem(periodDescription, this.color, 'Expense', '90', '10000$');

    container.append(periodImg, periodDescription);
    this.root.appendChild(container);
  }
}
