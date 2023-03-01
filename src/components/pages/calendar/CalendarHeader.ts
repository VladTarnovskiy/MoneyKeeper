import {
  baseCategoryExpenditureDataEng,
  baseCategoryExpenditureDataRu,
} from '@/components/base/baseCategoryData';
import { BaseComponent } from '@/components/base/baseComponent';
import { InputSelect } from '@/components/base/inputSelect';
import type { ITransactionReq } from '@/components/model/types';

export class CalendarHeader extends BaseComponent {
  root: HTMLElement;
  categoryContainer: HTMLElement;
  yearContainer: HTMLElement;
  categoryInputElement!: HTMLInputElement;
  yearInputElement!: HTMLInputElement;
  transactionData: ITransactionReq[];
  yearsArr: string[];
  yearChoice: HTMLElement;
  categoryChoice: HTMLElement;

  constructor(root: HTMLElement, transactionData: ITransactionReq[]) {
    super();
    this.root = root;
    this.transactionData = transactionData;
    this.categoryContainer = this.createElem(
      'div',
      'category__container flex pt-2 flex-row w-1/2 md:w-full',
    );

    this.categoryChoice = this.createElem('div', 'category__choice flex flex-col w-1/2');
    this.createCategoryChoice();

    this.yearContainer = this.createElem(
      'div',
      'year__container flex pt-2 flex-row w-1/2  md:w-full xs:ml-0',
    );
    this.yearChoice = this.createElem('div', 'year__choice flex flex-col w-1/2');
    this.yearsArr = ['2023', '2022', '2021', '2020'];
    this.createYearArr();

    this.render();
  }

  createCategoryChoice(): void {
    this.categoryChoice.replaceChildren();
    this.categoryContainer.replaceChildren();
    const categoryTranslate: string[] = baseCategoryExpenditureDataEng.map((a) => {
      return `${this.textTranslate(`CategoryExpenditure.${a}`)}`;
    });
    const categoryInputSelect = new InputSelect(
      this.categoryChoice,
      `${this.textTranslate('CalendarPage.SelectCategory')}`,
      [`${this.textTranslate('CategoryExpenditure.All')}`, ...categoryTranslate],
    );

    this.categoryInputElement = categoryInputSelect.filterSelect;
    const categoryTitle = this.createElem(
      'div',
      'category__title w-1/2 text-xl',
      `${this.textTranslate('CalendarPage.ExpenseCategory')}`,
    );

    this.categoryContainer.append(categoryTitle, this.categoryChoice);
  }

  createYearArr(): void {
    this.yearChoice.replaceChildren();
    this.yearContainer.replaceChildren();
    const newYearArr: string[] = [];

    this.transactionData.forEach((a) => {
      newYearArr.push(String(new Date(a.date).getFullYear()));
    });
    this.yearsArr = Array.from(new Set(newYearArr)).sort((a, b) => (a < b ? 1 : -1));
    const yearInputSelect = new InputSelect(
      this.yearChoice,
      `${this.textTranslate('CalendarPage.SelectYear')}`,
      this.yearsArr,
    );

    this.yearInputElement = yearInputSelect.filterSelect;
    const thisYear = localStorage.getItem('calendarYear');

    if (typeof thisYear === 'string' && newYearArr.includes(thisYear)) {
      this.yearInputElement.value = thisYear;
    }

    let thisCategory = localStorage.getItem('calendarCategory');

    if (typeof thisCategory === 'string') {
      const indexCategory: number = baseCategoryExpenditureDataRu.indexOf(thisCategory);
      const categoryName = baseCategoryExpenditureDataEng[indexCategory];

      if (typeof categoryName === 'string' && indexCategory >= 0) {
        thisCategory = categoryName;
      }
      if (thisCategory === 'Все'){thisCategory = 'All'}

      this.categoryInputElement.value = `${this.textTranslate(
        `CategoryExpenditure.${thisCategory}`,
      )}`;
    }

    const yearTitle = this.createElem(
      'div',
      'year__title text-xl w-1/2',
      `${this.textTranslate('CalendarPage.Year')}`,
    );

    this.yearContainer.append(yearTitle, this.yearChoice);
  }

  render(): void {
    this.root.append(this.categoryContainer, this.yearContainer);
  }
}
