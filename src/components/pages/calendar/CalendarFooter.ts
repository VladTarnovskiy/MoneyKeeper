import { BaseComponent } from '@/components/base/baseComponent';
import type { Model } from '@/components/model/model';

export class CalendarFooter extends BaseComponent {
  root: HTMLElement;
  footerInfoContainer: HTMLElement;
  footerInfoTotal: HTMLElement;
  footerInfoTotalCount: HTMLElement;
  footerInfoAverage: HTMLElement;
  footerInfoAverageCount: HTMLElement;
  footerInfoTotalIncome: HTMLElement;
  footerInfoTotalIncomeCount: HTMLElement;
  footerInfoRatio: HTMLElement;
  footerInfoRatioCount: HTMLElement;
  year: string;
  model: Model;

  constructor(root: HTMLElement, model: Model, year: string) {
    super();
    this.root = root;
    this.model = model;
    this.year = year;
    this.footerInfoContainer = this.createElem(
      'div',
      'footerInfo__container text-lg border-[1px] rounded p-2 grid grid-cols-2 xs:grid-cols-1 gap-1 w-1/2 xs:w-full sm:w-2/3 md:w-3/5',
    );

    this.footerInfoTotal = this.createElem(
      'div',
      'footerInfoTotal__title font-light text-left',
      `${this.textTranslate('CalendarPage.ExpenditureTotal')}`,
    );
    this.footerInfoAverage = this.createElem(
      'div',
      'average__title font-light text-left',
      `${this.textTranslate('CalendarPage.Average')}`,
    );
    this.footerInfoTotalIncome = this.createElem(
      'div',
      'footerInfoTotalIncome__title font-light text-left',
      `${this.textTranslate('CalendarPage.TotalIncome')}`,
    );
    this.footerInfoRatio = this.createElem(
      'div',
      'footerInfoRatio__title font-light text-left',
      `${this.textTranslate('CalendarPage.ExpenditureIncome')}`,
    );

    this.footerInfoTotalCount = this.createElem(
      'div',
      'footerInfoTotalCount__title text-right xs:text-left',
      `2.885 ${this.model.currencySign}`,
    );
    this.footerInfoAverageCount = this.createElem(
      'div',
      'averageCount__title text-right xs:text-left',
      `292.4 ${this.model.currencySign}/` + `${this.textTranslate('CalendarPage.month')}`,
    );
    this.footerInfoTotalIncomeCount = this.createElem(
      'div',
      'footerInfoTotalIncomeCount__title text-right xs:text-left',
      `3.100 ${this.model.currencySign}`,
    );
    this.footerInfoRatioCount = this.createElem(
      'div',
      'footerInfoRatioCount__title text-right xs:text-left',
      '93.06 %',
    );
    this.updateCalendarFooter(this.year);
    this.render();
  }

  updateCalendarFooter(year: string): void {
    let totalIncomeValue = 0;

    this.year = year;
    let totalExpenditureValue = 0;

    this.model.transaction.forEach((a) => {
      if (new Date(a.date).getFullYear() === Number(this.year)) {
        if (a.type === 'Income') {
          totalIncomeValue += a.sum;
        } else {
          totalExpenditureValue += a.sum;
        }
      }
    });
    this.footerInfoTotalIncomeCount.textContent = `${
      String(totalIncomeValue) + this.model.currencySign
    }`;
    this.footerInfoTotalCount.textContent = `${
      String(totalExpenditureValue) + this.model.currencySign
    }`;
    this.footerInfoAverageCount.textContent = `${
      String(Math.round(totalExpenditureValue / 1.2) / 10) + this.model.currencySign
    }/${this.textTranslate('CalendarPage.month')}`;
    const expensIncome = totalExpenditureValue / totalIncomeValue;

    if (isFinite(expensIncome)) {
      this.footerInfoRatioCount.style.display = 'block';
      this.footerInfoRatio.style.display = 'block';
      this.footerInfoRatioCount.textContent = `${String(Math.round(expensIncome * 100))}%`;
    } else {
      this.footerInfoRatioCount.style.display = 'none';
      this.footerInfoRatio.style.display = 'none';
    }

    this.updateCalendarFooterLanguage();
  }

  updateCalendarFooterLanguage(): void {
    this.footerInfoTotal.textContent = `${this.textTranslate('CalendarPage.ExpenditureTotal')}`;
    this.footerInfoAverage.textContent = `${this.textTranslate('CalendarPage.Average')}`;
    this.footerInfoTotalIncome.textContent = `${this.textTranslate('CalendarPage.TotalIncome')}`;
    this.footerInfoRatio.textContent = `${this.textTranslate('CalendarPage.ExpenditureIncome')}`;
  }

  render(): void {
    this.footerInfoContainer.append(
      this.footerInfoTotal,
      this.footerInfoTotalCount,
      this.footerInfoAverage,
      this.footerInfoAverageCount,
      this.footerInfoTotalIncome,
      this.footerInfoTotalIncomeCount,
      this.footerInfoRatio,
      this.footerInfoRatioCount,
    );
    this.root.append(this.footerInfoContainer);
  }
}
