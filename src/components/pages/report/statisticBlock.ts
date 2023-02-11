import { TransactionStatisticItem } from '@/components/pages/overview/transactionStatisticItem';
import type { Data } from '@/components/pages/report/type';

import { BaseComponent } from '../../base/baseComponent';

import './scrollBar.pcss';

export class StatisticBlock extends BaseComponent {
  root: HTMLElement;
  title: string;
  sum: string;
  titleColor: string;
  data: Data;
  constructor(root: HTMLElement, title: string, sum: string, data: Data, titleColor?: string) {
    super();

    this.root = root;
    this.title = title;
    this.sum = sum;
    this.data = data;

    if (titleColor === undefined) {
      this.titleColor = 'stone-600';
    } else {
      this.titleColor = titleColor;
    }

    this.render();
  }

  render(): void {
    const container = this.createElem(
      'div',
      `flex flex-col border-2 mb-2 font-light box-border text-${this.titleColor}`,
    );
    const statisticTitleContainer = this.createElem('div', 'flex justify-between bg-slate-200');
    const statisticTitle = this.createElem('div', 'text-2xl mb-2 ml-2', `${this.title}`);
    const statisticTitleSum = this.createElem(
      'div',
      'text-2xl mb-2 mr-2 font-normal',
      `${this.sum}`,
    );
    const statisticItems = this.createElem(
      'div',
      `statisticItems p-2 max-h-72 overflow-y-scroll flex flex-col`,
    );

    this.data.forEach((item) => {
      new TransactionStatisticItem(
        statisticItems,
        item.color,
        item.title,
        item.width,
        `${item.value} ( ${item.width}% )`,
        'stone-500',
      );
    });
    statisticTitleContainer.append(statisticTitle, statisticTitleSum);
    container.append(statisticTitleContainer, statisticItems);
    this.root.appendChild(container);
  }
}
