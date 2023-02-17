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
  netIncome: HTMLElement;
  updateTransactionList: (data: ITransactionReq[]) => void;
  renderTransactionList: () => void;

  constructor(
    root: HTMLElement,
    transactionData: ITransactionReq[],
    updateTransactionList: (data: ITransactionReq[]) => void,
    renderTransactionList: () => void,
  ) {
    super();
    this.root = root;
    this.transactionData = transactionData;
    this.updateTransactionList = updateTransactionList;
    this.renderTransactionList = renderTransactionList;

    this.periodItems = this.createElem('div', 'period__items flex flex-col');
    this.netIncome = this.createElem(
      'div',
      'period__title text-2xl pb-2 font-light text-stone-600 border-b-2 ',
      `Net Income for ${'All Time'}: ${0}${'$'}`,
    );
    this.renderPeriodItems();
    this.render();
  }

  renderPeriodItems(): void {
    this.periodItemDay = new PeriodItem(
      this.periodItems,
      '#ef4444',
      'Today',
      '1',
      this.sortTransactionDate('Today'),
      this.totalSum(this.sortTransactionDate('Today')),
      this.getNetIncome,
      this.updateTransactionList,
    );
    this.periodItemWeek = new PeriodItem(
      this.periodItems,
      '#3b82f6',
      'This Week',
      '7',
      this.sortTransactionDate('This Week'),
      this.totalSum(this.sortTransactionDate('This Week')),
      this.getNetIncome,
      this.updateTransactionList,
    );
    this.periodItemMonth = new PeriodItem(
      this.periodItems,
      '#10b981',
      'This Month',
      '31',
      this.sortTransactionDate('This Month'),
      this.totalSum(this.sortTransactionDate('This Month')),
      this.getNetIncome,
      this.updateTransactionList,
    );
    this.periodItemYear = new PeriodItem(
      this.periodItems,
      '#a855f7',
      'This Year',
      '365',
      this.sortTransactionDate('This Year'),
      this.totalSum(this.sortTransactionDate('This Year')),
      this.getNetIncome,
      this.updateTransactionList,
    );
    this.periodItemAll = new PeriodItem(
      this.periodItems,
      '#f59e0b',
      'All Time',
      'All',
      this.transactionData,
      this.totalSum(this.transactionData),
      this.getNetIncome,
      this.updateTransactionList,
    );
  }

  sortTransactionDate(way: string): ITransactionReq[] {
    let filterData: ITransactionReq[] = [];
    const date = new Date();
    const getTransactionDate = (item: ITransactionReq): Date => {
      return new Date(`${item.date}T${item.time}:00`);
    };

    switch (way) {
      case 'Today':
        filterData = this.transactionData.filter(
          (item) =>
            getTransactionDate(item).getFullYear() === date.getFullYear() &&
            getTransactionDate(item).getMonth() === date.getMonth() &&
            getTransactionDate(item).getDate() === date.getDate(),
        );
        break;

      case 'This Week':
        filterData = this.transactionData.filter(
          (item) =>
            getTransactionDate(item).getFullYear() === date.getFullYear() &&
            getTransactionDate(item).getMonth() === date.getMonth() &&
            getTransactionDate(item).getDate() >= date.getDate() - 7,
        );
        break;

      case 'This Month':
        filterData = this.transactionData.filter(
          (item) =>
            getTransactionDate(item).getFullYear() === date.getFullYear() &&
            getTransactionDate(item).getMonth() === date.getMonth(),
        );
        break;

      case 'This Year':
        filterData = this.transactionData.filter(
          (item) => getTransactionDate(item).getFullYear() === date.getFullYear(),
        );
        break;

      default:
        break;
    }

    return filterData;
  }

  totalSum(data: ITransactionReq[]): number {
    let allSum = 0;

    data.forEach((item) => {
      allSum = allSum + item.sum;
    });

    return allSum;
  }

  getNetIncome = (data: ITransactionReq[], itemType: string): void => {
    let netIncome = 0;

    data.forEach((item) => {
      item.type === 'Income' ? (netIncome += item.sum) : (netIncome -= item.sum);
    });
    this.netIncome.textContent = `Net Income (${itemType}): ${netIncome}${'$'}`;
  };

  getDataFromStorage(): void {
    const storagePeriodTransaction = localStorage.getItem('periodTransaction');

    if (storagePeriodTransaction === null) {
      this.getNetIncome(this.transactionData, 'All Time');
      this.renderTransactionList();
    } else {
      this.getNetIncome(
        this.sortTransactionDate(storagePeriodTransaction),
        storagePeriodTransaction,
      );
      this.updateTransactionList(this.sortTransactionDate(storagePeriodTransaction));
    }
  }

  render(): void {
    this.getDataFromStorage();
    const container = this.createElem('div', 'period__container flex flex-col');
    const periodTitle = this.createElem(
      'div',
      'period__title text-2xl pb-6 font-light text-sky-600',
      'Expense vs Income',
    );

    container.append(periodTitle, this.netIncome, this.periodItems);
    this.root.appendChild(container);
  }
}
