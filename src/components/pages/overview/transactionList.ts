import { BaseComponent } from '@/components/base/baseComponent';
import { InputSelect } from '@/components/base/inputSelect';
import type { ITransactionReq, PostJsonResponse, ITransaction } from '@/components/model/types';
import { TransactionItem } from '@/components/pages/overview/tranactionItem';

interface ITransactionsList {
  delete: <T>(id: number) => Promise<PostJsonResponse<T>>;
  getTransactions: <T extends ITransactionReq>() => Promise<PostJsonResponse<T[]>>;
}

export class TransactionList extends BaseComponent {
  root: HTMLElement;
  transactionItems: HTMLElement;
  sortContainer: HTMLElement;
  sortItem: InputSelect;
  filterItem: InputSelect;
  transactionItem: TransactionItem;
  // transactionItemTwo: TransactionItem;

  constructor(root: HTMLElement, prop: ITransactionsList, data: ITransaction[]) {
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
    this.transactionItem = new TransactionItem(this.transactionItems, 'expense', prop, data);
    // this.transactionItemTwo = new TransactionItem(this.transactionItems, 'income');
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
