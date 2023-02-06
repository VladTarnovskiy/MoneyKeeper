import { BaseComponent } from '../../base/baseComponent';

import { FilterItem } from './filterItem';
import { SortItem } from './sortItem';
import { TransactionItem } from './tranactionItem';

export class TransactionList extends BaseComponent {
  root: HTMLElement;
  transactionItems: HTMLElement;
  sortContainer: HTMLElement;
  sortItem: SortItem;
  filterItem: FilterItem;
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
    this.sortItem = new SortItem(this.sortContainer);
    this.filterItem = new FilterItem(this.sortContainer);
    this.transactionItem = new TransactionItem(this.transactionItems, 'expence');
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
