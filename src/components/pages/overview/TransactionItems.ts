import { BaseComponent } from '@/components/base/baseComponent';
import type { PostJsonResponse, ITransactionReq } from '@/components/model/types';

import expenseAssets from '@/assets/expense.png';
import incomeAssets from '@/assets/income.png';

interface ITransactionsList {
  delete: <T>(id: number) => Promise<PostJsonResponse<T>>;
  rebuild: () => void;
}

export class TransactionItems extends BaseComponent {
  root: HTMLElement;
  prop: ITransactionsList;
  data: ITransactionReq[];
  currency: string;
  constructor(
    root: HTMLElement,
    prop: ITransactionsList,
    data: ITransactionReq[],
    currency: string,
  ) {
    super();
    this.root = root;
    this.prop = prop;
    this.data = data;
    this.currency = currency;
    this.render();
  }

  render(): void {
    this.data.forEach((item) => {
      let sign = '-';
      const container = this.createElem(
        'div',
        'transaction__container items-center border-2 rounded p-1 mb-2 flex cursor-pointer cursor-alias hover:bg-gray-100 dark:hover:bg-gray-300',
      );

      container.addEventListener('click', (e) => {
        this.getContextMenu(e, item);
      });

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
      const transactionItemTitleOne = this.createElem(
        'div',
        'transaction__item_title',
        item.type === 'Expense'
          ? this.textTranslate(`CategoryExpenditure.${item.category}`)
          : this.textTranslate(`CategoryIncome.${item.category}`),
      );

      if (item.type === 'Income') {
        sign = '+';
      }

      const transactionItemDescOne = this.createElem(
        'div',
        'transaction__item_sum text-right dark:font-normal',
        `${sign} ${item.sum}${this.currency}`,
      );

      transactionItemOne.append(transactionItemTitleOne, transactionItemDescOne);

      const transactionItemTwo = this.createElem(
        'div',
        'transaction__item w-full items-center text-stone-900 font-light justify-between flex gap-2',
      );
      const transactionItemTitleTwo = this.createElem(
        'div',
        'transaction__item_title',
        `${item.subcategory}`,
      );

      const transactionItemDescTwo = this.createElem(
        'div',
        'transaction__item_sum text-right',
        `${item.date} (${item.time})`,
      );

      if (item.type === 'Expense') {
        transactionImg.style.backgroundImage = `url(${expenseAssets})`;
        transactionItemDescOne.classList.add('text-red-500', 'dark:text-red-700');
      } else {
        transactionImg.style.backgroundImage = `url(${incomeAssets})`;
        transactionItemDescOne.classList.add('text-green-500', 'dark:text-green-700');
      }

      transactionItemTwo.append(transactionItemTitleTwo, transactionItemDescTwo);

      transactionDescription.append(transactionItemOne, transactionItemTwo);
      container.append(transactionImg, transactionDescription);
      this.root.appendChild(container);
    });
  }

  getContextMenu(e: MouseEvent, item: ITransactionReq): void {
    const contextMenu = document.querySelector('.context-menu');

    if (contextMenu !== null) {
      contextMenu.remove();
    }

    e.preventDefault();
    const left = e.clientX;
    const top = e.clientY;
    const contMenuContainer = this.createElem(
      'div',
      `context-menu fixed bg-white w-40 shadow-md rounded dark:bg-gray-300 flex flex-col`,
    );

    contMenuContainer.style.left = `${left}px`;
    contMenuContainer.style.top = `${top}px`;
    const detailItem = this.createElem(
      'ul',
      'text-xl p-1 font-light border-b-[1px] border-stone-400 text-stone-900 cursor-pointer hover:bg-slate-200',
      `☰ ${this.textTranslate('Overview.popup.detailBut')}`,
    );

    detailItem.addEventListener('click', () => {
      this.getPopupItem(item);
    });
    const removeItem = this.createElem(
      'ul',
      'text-xl p-1 font-light text-stone-900 cursor-pointer hover:bg-slate-200',
      `☓ ${this.textTranslate('Overview.popup.removeBut')}`,
    );

    removeItem.addEventListener('click', () => {
      this.prop
        .delete(item.id)
        .then(() => {
          this.prop.rebuild();
        })
        .catch((err: string) => new Error(err));
    });

    contMenuContainer.append(detailItem, removeItem);
    document.body.append(contMenuContainer);
    setTimeout(() => {
      document.body.addEventListener('click', () => {
        contMenuContainer.remove();
      });
    }, 0);
  }

  getPopupItem(item: ITransactionReq): void {
    let sign = '-';
    const bgHide = this.createElem(
      'div',
      'fixed w-full h-full opacity-50 top-0 left-0 bg-slate-800 z-10',
    );
    const container = this.createElem(
      'div',
      'fixed transaction__container dark:bg-gray-300 z-20 bg-white items-center shadow-2xl border-[1px] rounded pt-2 pb-2 pl-3 pr-3 flex flex-col -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2',
    );
    const title = this.createElem(
      'div',
      'page__title text-3xl text-sky-600 dark:text-sky-900 dark:font-bold mb-5',
      this.textTranslate('Overview.popup.detail'),
    );

    const transactionImg = this.createElem(
      'div',
      'relative rounded-lg bg-contain transaction__img w-14 h-14 mt-4',
    );

    const transactionDescription = this.createElem('div', 'grow flex flex-col min-w-[300px]');

    const transactionItemOne = this.createElem(
      'div',
      'transaction__item font-normal w-full items-center text-stone-900 font-light flex justify-between gap-2',
    );
    const transactionItemTitleOne = this.createElem(
      'div',
      'transaction__item_title dark:font-semibold',
      `${this.textTranslate('Overview.popup.sum')}:`,
    );

    if (item.type === 'Income') {
      sign = '+';
    }

    const transactionItemDescOne = this.createElem(
      'div',
      'transaction__item_sum text-right dark:font-semibold',
      `${sign}${item.sum}${this.currency}`,
    );

    transactionItemOne.append(transactionItemTitleOne, transactionItemDescOne);

    if (item.type === 'Expense') {
      transactionImg.style.backgroundImage = `url(${expenseAssets})`;
      transactionItemDescOne.classList.add('text-red-500');
    } else {
      transactionImg.style.backgroundImage = `url(${incomeAssets})`;
      transactionItemDescOne.classList.add('text-green-500', 'dark:text-green-900');
    }

    transactionItemOne.append(transactionItemTitleOne, transactionItemDescOne);

    transactionDescription.append(transactionItemOne);
    this.transactionProperty(
      transactionDescription,
      this.textTranslate('Overview.popup.category'),
      item.type === 'Expense'
        ? this.textTranslate(`CategoryExpenditure.${item.category}`)
        : this.textTranslate(`CategoryIncome.${item.category}`),
    );
    this.transactionProperty(
      transactionDescription,
      this.textTranslate('Overview.popup.subcategory'),
      `${item.subcategory}`,
    );
    this.transactionProperty(
      transactionDescription,
      this.textTranslate('Overview.popup.date'),
      `${item.date}`,
    );
    this.transactionProperty(
      transactionDescription,
      this.textTranslate('Overview.popup.time'),
      `${item.time}`,
    );
    this.transactionProperty(
      transactionDescription,
      this.textTranslate('Overview.popup.description'),
      `${item.description}`,
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
