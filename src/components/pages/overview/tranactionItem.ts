import { BaseComponent } from '../../base/baseComponent';
import '../../../assets/income.png';
import '../../../assets/expence.png';

export class TransactionItem extends BaseComponent {
  root: HTMLElement;
  transaction: string;
  constructor(root: HTMLElement, transaction: string) {
    super();
    this.root = root;
    this.transaction = transaction;
    this.render();
  }
  render(): void {
    let sign = '-';
    const container = this.createElem(
      'div',
      'transaction__container items-center border-2 rounded p-1 mb-2 flex',
    );
    const transactionImg = this.createElem(
      'div',
      'relative rounded-lg bg-contain transaction__img w-14 h-14',
    );
    const transactionDescription = this.createElem(
      'div',
      'transaction__description grow ml-2 flex flex-col',
    );

    const transactionItemOne = this.createElem(
      'div',
      'transaction__item font-normal w-full items-center text-stone-900 font-light flex justify-between gap-2',
    );
    const transactionItemTitleOne = this.createElem('div', 'transaction__item_title', 'Home');

    if (this.transaction === 'income') {
      sign = '+';
    }

    const transactionItemDescOne = this.createElem(
      'div',
      'transaction__item_sum text-right',
      `${sign}3000$`,
    );

    transactionItemOne.append(transactionItemTitleOne, transactionItemDescOne);

    const transactionItemTwo = this.createElem(
      'div',
      'transaction__item w-full items-center text-stone-900 font-light justify-between flex gap-2',
    );
    const transactionItemTitleTwo = this.createElem('div', 'transaction__item_title', 'Chair');

    if (this.transaction === 'income') {
      transactionItemTitleTwo.textContent = '';
    }

    const transactionItemDescTwo = this.createElem(
      'div',
      'transaction__item_sum text-right',
      '24.08.2023(14:11)',
    );

    if (this.transaction === 'expence') {
      transactionImg.style.backgroundImage = "url('../../../assets/expence.png')";
      transactionItemDescOne.classList.add('text-red-500');
    } else {
      transactionImg.style.backgroundImage = "url('../../../assets/income.png')";
      transactionItemDescOne.classList.add('text-green-500');
    }

    transactionItemTwo.append(transactionItemTitleTwo, transactionItemDescTwo);

    transactionDescription.append(transactionItemOne, transactionItemTwo);
    container.append(transactionImg, transactionDescription);
    this.root.appendChild(container);
  }
}
