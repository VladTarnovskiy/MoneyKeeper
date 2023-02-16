import { baseCategoryExpenditureDataEng } from '@/components/base/baseCategoryData';
import { BaseComponent } from '@/components/base/baseComponent';
import { InputSelect } from '@/components/base/inputSelect';
import type { ITransactionReq } from '@/components/model/types';

export class CalendarHeader extends BaseComponent {
  root: HTMLElement;
  categoryContainer: HTMLElement;
  yearContainer: HTMLElement;
  categoryInputElement: HTMLInputElement;
  yearInputElement!: HTMLInputElement;
  transactionData: ITransactionReq[];
  yearsArr: string[];
  yearChoice: HTMLElement;

  constructor(root: HTMLElement, transactionData: ITransactionReq[]) {
    super();
    this.root = root;
    this.transactionData = transactionData;
    this.categoryContainer = this.createElem(
      'div',
      'category__container flex flex-row w-1/2 xs:w-full mr-2',
    );
    const categoryTitle = this.createElem(
      'div',
      'category__title w-1/2 text-xl',
      'Expense сategory:',
    );
    const categoryChoice = this.createElem('div', 'category__choice flex flex-col w-1/2');
    const categoryInputSelect = new InputSelect(categoryChoice, 'Select a category', [
      'All',
      ...baseCategoryExpenditureDataEng,
    ]);

    this.categoryInputElement = categoryInputSelect.filterSelect;
    this.categoryContainer.append(categoryTitle, categoryChoice);

    this.yearContainer = this.createElem(
      'div',
      'year__container flex flex-row w-1/2 xs:w-full ml-2 xs:ml-0',
    );
    const yearTitle = this.createElem('div', 'year__title text-xl w-1/2', 'Year:');

    this.yearChoice = this.createElem('div', 'year__choice flex flex-col w-1/2');
    this.yearsArr = ['2023', '2022', '2021', '2020'];
    this.createYearArr();

    this.yearContainer.append(yearTitle, this.yearChoice);

    this.render();
  }

  createYearArr(): void {
    this.yearChoice.textContent = '';
    const newYearArr: string[] = [];

    this.transactionData.forEach((a) => {
      newYearArr.push(String(new Date(a.date).getFullYear()));
    });
    this.yearsArr = Array.from(new Set(newYearArr)).sort((a, b) => (a < b ? 1 : -1));
    const yearInputSelect = new InputSelect(this.yearChoice, 'Select year', this.yearsArr);

    this.yearInputElement = yearInputSelect.filterSelect;
    const thisYear = localStorage.getItem('calendarYear');

    if (typeof thisYear === 'string' && newYearArr.includes(thisYear)) {
      this.yearInputElement.value = thisYear;
    }
  }

  render(): void {
    this.root.append(this.categoryContainer, this.yearContainer);
  }
}
