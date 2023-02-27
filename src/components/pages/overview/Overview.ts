import { BaseComponent } from '@/components/base/baseComponent';
import type { Model } from '@/components/model/model';
import type { ITransactionReq } from '@/components/model/types';

import { TransactionList } from './TransactionList';
import { TransactionPeriod } from './TransactionPeriod';

export class Overview extends BaseComponent {
  node: HTMLElement;
  container!: HTMLElement;
  pageTitle!: HTMLElement;
  pageContent!: HTMLElement;
  transactionPeriod!: TransactionPeriod;
  transactionsList!: TransactionList;
  transactionsListContainer!: HTMLElement;
  model: Model;
  updateHeaderSum: () => void;

  constructor(model: Model, updateHeaderSum: () => void) {
    super();
    this.model = model;
    this.updateHeaderSum = updateHeaderSum;
    this.node = this.build();
  }

  build(): HTMLElement {
    this.container = this.createElem('div', 'content__container flex flex-col');
    this.pageTitle = this.createElem(
      'div',
      'page__title ml-2 text-3xl text-sky-600 dark:font-semibold dark:text-sky-900 dark:bg-gray-400 mb-5 bg-sky-100 rounded pl-2',
      this.textTranslate('Overview.title'),
    );

    this.pageContent = this.createElem('div', 'page__content gap-2 flex md:flex-col');
    const transactionPeriodContainer = this.createElem(
      'div',
      'expense__period border-2 p-2 basis-1/2 rounded',
    );

    this.transactionsListContainer = this.createElem(
      'div',
      'transactions__list border-2 p-2 basis-1/2 rounded',
    );

    this.pageContent.append(transactionPeriodContainer, this.transactionsListContainer);
    this.container.append(this.pageTitle, this.pageContent);
    this.transactionsList = new TransactionList(
      this.transactionsListContainer,
      {
        delete: this.model.deleteTransactions.bind(this.model),
        rebuild: this.rebuild,
      },
      this.model.transaction,
      this.model.currencySign,
    );
    this.transactionPeriod = new TransactionPeriod(
      transactionPeriodContainer,
      this.model.transaction,
      this.updateTransactionList,
      this.transactionsList.render.bind(this.transactionsList),
      this.model.currencySign,
    );

    return this.container;
  }

  render(): void {
    const node = this.build();

    this.node.replaceWith(node);

    this.node = node;
  }

  rebuild = (): void => {
    this.pageContent.replaceChildren();
    this.render();
    this.updateHeaderSum();
  };

  updateTransactionList = (data: ITransactionReq[]): void => {
    this.transactionsListContainer.replaceChildren();
    this.transactionsList = new TransactionList(
      this.transactionsListContainer,
      {
        delete: this.model.deleteTransactions.bind(this.model),
        rebuild: this.rebuild,
      },
      data,
      this.model.currencySign,
    );
    this.transactionsList.render();
  };
}
