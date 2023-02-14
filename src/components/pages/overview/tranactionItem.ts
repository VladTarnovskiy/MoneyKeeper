import { BaseComponent } from '@/components/base/baseComponent';

import expenseAssets from '@/assets/expense.png';
import incomeAssets from '@/assets/income.png';

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

    container.addEventListener('contextmenu', this.getContextMenu);

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

    if (this.transaction === 'expense') {
      transactionImg.style.backgroundImage = `url(${expenseAssets})`;
      transactionItemDescOne.classList.add('text-red-500');
    } else {
      transactionImg.style.backgroundImage = `url(${incomeAssets})`;
      transactionItemDescOne.classList.add('text-green-500');
    }

    transactionItemTwo.append(transactionItemTitleTwo, transactionItemDescTwo);

    transactionDescription.append(transactionItemOne, transactionItemTwo);
    container.append(transactionImg, transactionDescription);
    this.root.appendChild(container);
  }

  getContextMenu = (e: MouseEvent): void => {
    const contextMenu = document.querySelector('.context-menu');

    if (contextMenu !== null) {
      contextMenu.remove();
    }

    e.preventDefault();
    const left = e.clientX;
    const top = e.clientY;
    const contMenuContainer = this.createElem(
      'div',
      `context-menu fixed bg-white shadow-md rounded flex flex-col`,
    );

    contMenuContainer.style.left = `${left}px`;
    contMenuContainer.style.top = `${top}px`;
    const detailItem = this.createElem(
      'ul',
      'text-xl p-1 font-light border-b-[1px] border-stone-400 text-stone-900 cursor-pointer hover:bg-slate-200',
      '☰ detail',
    );

    detailItem.addEventListener('click', () => {
      this.getPopupItem();
    });
    const removeItem = this.createElem(
      'ul',
      'text-xl p-1 font-light text-stone-900 cursor-pointer hover:bg-slate-200',
      '☓ remove',
    );

    contMenuContainer.append(detailItem, removeItem);
    document.body.append(contMenuContainer);
    document.body.addEventListener('click', () => {
      contMenuContainer.remove();
    });
  };

  getPopupItem(): void {
    let sign = '-';
    const bgHide = this.createElem(
      'div',
      'fixed w-full h-full opacity-50 top-0 left-0 bg-slate-800 z-10',
    );
    const container = this.createElem(
      'div',
      'fixed transaction__container z-20 bg-white items-center shadow-2xl border-[1px] rounded p-1 mb-2 flex flex-col -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2',
    );
    const title = this.createElem('div', 'page__title ml-2 text-3xl text-sky-600 mb-5', 'Detail');

    const transactionImg = this.createElem(
      'div',
      'relative rounded-lg bg-contain transaction__img w-14 h-14 mt-2',
    );

    const transactionDescription = this.createElem(
      'div',
      'transaction__description grow ml-2 flex flex-col min-w-[300px]',
    );

    const transactionItemOne = this.createElem(
      'div',
      'transaction__item font-normal w-full items-center text-stone-900 font-light flex justify-between gap-2',
    );
    const transactionItemTitleOne = this.createElem('div', 'transaction__item_title', 'Sum:');

    if (this.transaction === 'income') {
      sign = '+';
    }

    const transactionItemDescOne = this.createElem(
      'div',
      'transaction__item_sum text-right',
      `${sign}3000$`,
    );

    transactionItemOne.append(transactionItemTitleOne, transactionItemDescOne);

    if (this.transaction === 'expense') {
      transactionImg.style.backgroundImage = `url(${expenseAssets})`;
      transactionItemDescOne.classList.add('text-red-500');
    } else {
      transactionImg.style.backgroundImage = `url(${incomeAssets})`;
      transactionItemDescOne.classList.add('text-green-500');
    }

    transactionItemOne.append(transactionItemTitleOne, transactionItemDescOne);

    transactionDescription.append(transactionItemOne);
    this.transactionProperty(transactionDescription, 'Category', 'Home');
    this.transactionProperty(transactionDescription, 'Subcategory', 'Chair');
    this.transactionProperty(transactionDescription, 'Date', '23.05.2022');
    this.transactionProperty(transactionDescription, 'Time', '14:00');
    this.transactionProperty(
      transactionDescription,
      'Description',
      'Keep that word description that word description that word description that word description that word description that word description',
    );
    bgHide.addEventListener('click', () => {
      bgHide.remove();
      container.remove();
    });

    container.append(title, transactionDescription, transactionImg);
    document.body.appendChild(bgHide);
    document.body.appendChild(container);
  }

  transactionProperty(root: HTMLElement, title: string, proper: string): void {
    const transactionItemProperty = this.createElem(
      'div',
      'transaction__item font-normal w-full items-center text-stone-900 font-light flex justify-between gap-2',
    );
    const transactionItemTitleProperty = this.createElem(
      'div',
      'transaction__item_title  self-start',
      `${title}:`,
    );
    const transactionItemDescProperty = this.createElem(
      'div',
      'transaction__item_sum font-light max-w-xs',
      `${proper}`,
    );

    transactionItemProperty.append(transactionItemTitleProperty, transactionItemDescProperty);
    root.appendChild(transactionItemProperty);
  }
}