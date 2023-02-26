import { BaseComponent } from '@/components/base/baseComponent';
import type { PostJsonResponse, ITransactionReq } from '@/components/model/types';
import { TransactionItems } from '@/components/pages/overview/TransactionItems';

import { InputSelect } from './InputSelect';

interface ITransactionsList {
  delete: <T>(id: number) => Promise<PostJsonResponse<T>>;
  rebuild: () => void;
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
  currency: string;

  constructor(
    root: HTMLElement,
    prop: ITransactionsList,
    transactionData: ITransactionReq[],
    currency: string,
  ) {
    super();
    this.root = root;
    this.prop = prop;
    this.currency = currency;
    this.transactionData = transactionData;
    this.filterData = transactionData;
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
      this.textTranslate('Overview.sort.title'),
      [
        {
          option: `${this.textTranslate('Overview.sort.default')}`,
          value: '',
        },
        {
          option: `${this.textTranslate('Overview.sort.dateInc')}`,
          value: 'DateInc',
        },
        {
          option: `${this.textTranslate('Overview.sort.dateDec')}`,
          value: 'DateDec',
        },
        {
          option: `${this.textTranslate('Overview.sort.sumInc')}`,
          value: 'SumInc',
        },
        {
          option: `${this.textTranslate('Overview.sort.sumDec')}`,
          value: 'SumDec',
        },
      ],
      this.getSortData,
      'Sort transactions',
    );
    this.filterItem = new InputSelect(
      this.sortContainer,
      this.textTranslate('Overview.filter.title'),
      [
        {
          option: `${this.textTranslate('Overview.filter.default')}`,
          value: '',
        },
        {
          option: `${this.textTranslate('Overview.filter.all')}`,
          value: 'All',
        },
        {
          option: `${this.textTranslate('Overview.filter.expense')}`,
          value: 'Expense',
        },
        {
          option: `${this.textTranslate('Overview.filter.income')}`,
          value: 'Income',
        },
      ],
      this.getFilterData,
      'Filter transactions',
    );
    this.transactionItem = new TransactionItems(
      this.transactionItems,
      prop,
      transactionData,
      this.currency,
    );
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
    this.transactionItem = new TransactionItems(
      this.transactionItems,
      this.prop,
      this.filterData,
      this.currency,
    );
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
    this.transactionItem = new TransactionItems(
      this.transactionItems,
      this.prop,
      this.filterData,
      this.currency,
    );
  };

  getDataFromStorage(): void {
    const storageSortTransType = localStorage.getItem('Sort transactions');
    const storageFilterTransType = localStorage.getItem('Filter transactions');

    if (storageSortTransType !== null) {
      this.getSortData(storageSortTransType);
    }

    if (storageFilterTransType !== null) {
      this.getFilterData(storageFilterTransType);
    }
  }

  render = (): void => {
    this.getDataFromStorage();
    const container = this.createElem('div', 'transaction-list__container flex flex-col');
    const transactionListTitle = this.createElem(
      'div',
      'transaction-list text-2xl mb-4 font-light text-sky-600 dark:font-medium dark:text-stone-600',
      this.textTranslate('Overview.titleTransactions'),
    );

    container.append(transactionListTitle, this.sortContainer, this.transactionItems);
    this.root.appendChild(container);
  };
}
