import { InputSelect } from '@/components/pages/overview/inputSelect';

import { BaseComponent } from '../../base/baseComponent';

import { TransactionItem } from './tranactionItem';

export class TransactionList extends BaseComponent {
  root: HTMLElement;
  transactionItems: HTMLElement;
  sortContainer: HTMLElement;
  sortItem: InputSelect;
  filterItem: InputSelect;
  transactionItem: TransactionItem;
  transactionItemTwo: TransactionItem;

  constructor(root: HTMLElement) {
    super();
    this.root = root;
    this.sortContainer = this.createElem(
      'div',
      'transaction-list__sort gap-2 mb-4 flex justify-around',
    );
    this.transactionItems = this.createElem('div', 'period__items flex flex-col');
    this.sortItem = new InputSelect(this.sortContainer, 'Sort by', [
      'DateInc',
      'DateDec',
      'SumInc',
      'SumDec',
    ]);
    this.filterItem = new InputSelect(this.sortContainer, 'Filter by', [
      'All',
      'Expense',
      'Income',
    ]);
    this.transactionItem = new TransactionItem(this.transactionItems, 'expense');
    this.transactionItemTwo = new TransactionItem(this.transactionItems, 'income');
    this.render();
  }

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
