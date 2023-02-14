import { BaseComponent } from '@/components/base/baseComponent';
import type { PostJsonResponse, ITransactionReq } from '@/components/model/types';
import { TransactionItems } from '@/components/pages/overview/tranactionItems';

import { InputSelect } from './inputSelect';

interface ITransactionsList {
  delete: <T>(id: number) => Promise<PostJsonResponse<T>>;
  // getTransactions: <T extends ITransactionReq>() => Promise<PostJsonResponse<T[]>>;
}

export class TransactionList extends BaseComponent {
  root: HTMLElement;
  transactionItems: HTMLElement;
  sortContainer: HTMLElement;
  sortItem: InputSelect;
  filterItem: InputSelect;
  transactionItem: TransactionItems;
  transactionData: ITransactionReq[];
  filterData: ITransactionReq[];
  prop: ITransactionsList;

  constructor(root: HTMLElement, prop: ITransactionsList, transationData: ITransactionReq[]) {
    super();
    this.root = root;
    this.prop = prop;
    this.transactionData = transationData;
    this.filterData = transationData;
    this.sortContainer = this.createElem(
      'div',
      'transaction-list__sort gap-2 mb-4 flex justify-around',
    );
    this.transactionItems = this.createElem(
      'div',
      'period__items flex flex-col max-h-[36rem] overflow-y-scroll',
    );
    this.sortItem = new InputSelect(
      this.sortContainer,
      'Sort by',
      ['DateInc', 'DateDec', 'SumInc', 'SumDec'],
      this.getSortData,
    );
    this.filterItem = new InputSelect(
      this.sortContainer,
      'Filter by',
      ['All', 'Expense', 'Income'],
      this.getFilterData,
    );
    this.transactionItem = new TransactionItems(this.transactionItems, prop, transationData);
    this.render();
  }

  getSortData = (way: string): void => {
    switch (way) {
      case 'SumInc':
        this.filterData = this.filterData.sort((a, b) => a.sum - b.sum);
        break;

      case 'SumDec':
        this.filterData = this.filterData.sort((a, b) => b.sum - a.sum);
        break;

      case 'DateInc':
        this.filterData = this.filterData.sort(
          (a, b) =>
            Math.floor(new Date(`${a.date}T${a.time}:00`).getTime() / 1000) -
            Math.floor(new Date(`${b.date}T${b.time}:00`).getTime() / 1000),
        );
        break;

      case 'DateDec':
        this.filterData = this.filterData.sort(
          (a, b) =>
            Math.floor(new Date(`${b.date}T${b.time}:00`).getTime() / 1000) -
            Math.floor(new Date(`${a.date}T${a.time}:00`).getTime() / 1000),
        );
        break;

      default:
        break;
    }

    this.transactionItems.replaceChildren();
    this.transactionItem = new TransactionItems(this.transactionItems, this.prop, this.filterData);
  };

  getFilterData = (way: string): void => {
    switch (way) {
      case 'Expense':
        this.filterData = this.transactionData.filter((item) => item.type === 'Expense');
        break;

      case 'Income':
        this.filterData = this.transactionData.filter((item) => item.type === 'Income');
        break;

      case 'All':
        this.filterData = this.transactionData;
        break;

      default:
        break;
    }

    this.transactionItems.replaceChildren();
    this.transactionItem = new TransactionItems(this.transactionItems, this.prop, this.filterData);
  };

  render(): void {
    const container = this.createElem('div', 'transaction-list__container flex flex-col');
    const transactionListTitle = this.createElem(
      'div',
      'transaction-list text-2xl mb-4 font-light text-sky-600',
      'Transactions',
    );

    container.append(transactionListTitle, this.sortContainer, this.transactionItems);
    this.root.appendChild(container);
  }
}
