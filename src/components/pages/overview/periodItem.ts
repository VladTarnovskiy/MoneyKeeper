import { BaseComponent } from '@/components/base/baseComponent';
import { TransactionStatisticItem } from '@/components/base/statisticItem';
import type { ITransactionReq } from '@/components/model/types';

import { calendar } from '@/assets/svgStore';

export class PeriodItem extends BaseComponent {
  root: HTMLElement;
  color: string;
  title: string;
  date: string;
  transactionData: ITransactionReq[];
  allSum: number;

  constructor(
    root: HTMLElement,
    color: string,
    title: string,
    date: string,
    transactionData: ITransactionReq[],
    allSum: number,
  ) {
    super();
    this.root = root;
    this.color = color;
    this.title = title;
    this.date = date;
    this.transactionData = transactionData;
    this.allSum = allSum;
    this.render();
  }

  render(): void {
    const container = this.createElem(
      'div',
      'period__container items-center border-b-2 p-1 mb-4 flex hover:bg-gray-100 active:bg-gray-300 active:scale-[1] hover:scale-[1.013] hover:transition-all cursor-pointer',
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
    let sumIncome = 0;
    let sumExpense = 0;

    this.transactionData.forEach((item) => {
      item.type === 'Income'
        ? (sumIncome = sumIncome + item.sum)
        : (sumExpense = sumExpense + item.sum);
    });

    new TransactionStatisticItem(
      periodDescription,
      this.color,
      'Income',
      ` ${Math.ceil((sumIncome * 100) / this.allSum)}`,
      `${sumIncome}$`,
      'text-sky-500',
    );

    new TransactionStatisticItem(
      periodDescription,
      this.color,
      'Expense',
      ` ${Math.ceil((sumExpense * 100) / this.allSum)}`,
      `${sumExpense}$`,
    );

    container.append(periodImg, periodDescription);
    this.root.appendChild(container);
  }
}
