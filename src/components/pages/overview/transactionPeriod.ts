import { BaseComponent } from '@/components/base/baseComponent';
import type { ITransactionReq } from '@/components/model/types';

import { PeriodItem } from './periodItem';

export class TransactionPeriod extends BaseComponent {
  root: HTMLElement;
  periodItems: HTMLElement;
  periodItemDay: PeriodItem | undefined;
  periodItemWeek: PeriodItem | undefined;
  periodItemMonth: PeriodItem | undefined;
  periodItemYear: PeriodItem | undefined;
  periodItemAll: PeriodItem | undefined;
  transactionData: ITransactionReq[];

  constructor(root: HTMLElement, transactionData: ITransactionReq[]) {
    super();
    this.root = root;
    this.transactionData = transactionData;
    this.periodItems = this.createElem('div', 'period__items flex flex-col');
    this.renderPeriodItems();
    this.render();
  }

  renderPeriodItems(): void {
    let allSum = 0;

    this.transactionData.forEach((item) => {
      allSum = allSum + item.sum;
    });
    this.periodItemDay = new PeriodItem(
      this.periodItems,
      '#ef4444',
      'Today',
      '1',
      this.sortTransactionDate('today'),
      allSum,
    );
    this.periodItemWeek = new PeriodItem(
      this.periodItems,
      '#3b82f6',
      'This Week',
      '7',
      this.sortTransactionDate('week'),
      allSum,
    );
    this.periodItemMonth = new PeriodItem(
      this.periodItems,
      '#10b981',
      'This Month',
      '31',
      this.sortTransactionDate('month'),
      allSum,
    );
    this.periodItemYear = new PeriodItem(
      this.periodItems,
      '#a855f7',
      'This Year',
      '365',
      this.sortTransactionDate('year'),
      allSum,
    );
    this.periodItemAll = new PeriodItem(
      this.periodItems,
      '#f59e0b',
      'All Time',
      'All',
      this.transactionData,
      allSum,
    );
  }

  sortTransactionDate(way: string): ITransactionReq[] {
    let filterData: ITransactionReq[] = [];
    const date = new Date();

    const getTransactionDate = (item: ITransactionReq): Date => {
      return new Date(`${item.date}T${item.time}:00`);
    };

    switch (way) {
      case 'today':
        filterData = this.transactionData.filter(
          (item) =>
            getTransactionDate(item).getFullYear() === date.getFullYear() &&
            getTransactionDate(item).getMonth() === date.getMonth() &&
            getTransactionDate(item).getDate() === date.getDate(),
        );
        break;

      case 'week':
        filterData = this.transactionData.filter(
          (item) =>
            getTransactionDate(item).getFullYear() === date.getFullYear() &&
            getTransactionDate(item).getMonth() === date.getMonth() &&
            getTransactionDate(item).getDate() >= date.getDate() - 7,
        );
        break;

      case 'month':
        filterData = this.transactionData.filter(
          (item) =>
            getTransactionDate(item).getFullYear() === date.getFullYear() &&
            getTransactionDate(item).getMonth() === date.getMonth(),
        );
        break;

      case 'year':
        filterData = this.transactionData.filter(
          (item) => getTransactionDate(item).getFullYear() === date.getFullYear(),
        );
        break;

      default:
        break;
    }

    return filterData;
  }

  render(): void {
    const container = this.createElem('div', 'period__container flex flex-col');
    const periodTitle = this.createElem(
      'div',
      'period__title text-2xl pb-16 font-light text-sky-600 border-b-2 ',
      'Expense vs Income',
    );

    container.append(periodTitle, this.periodItems);
    this.root.appendChild(container);
  }
}
