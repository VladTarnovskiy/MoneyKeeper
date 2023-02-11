import { BaseComponent } from '../../base/baseComponent';

export class CalendarFooter extends BaseComponent {
  root: HTMLElement;
  footerInfoContainer!: HTMLElement;
  footerInfoTotal!: HTMLElement;
  footerInfoTotalCount!: HTMLElement;
  footerInfoAverage!: HTMLElement;
  footerInfoAverageCount!: HTMLElement;
  footerInfoTotalIncome!: HTMLElement;
  footerInfoTotalIncomeCount!: HTMLElement;
  footerInfoRatio!: HTMLElement;
  footerInfoRatioCount!: HTMLElement;

  constructor(root: HTMLElement) {
    super();
    this.root = root;
    this.footerInfoContainer = this.createElem(
      'div',
      'footerInfo__container grid grid-cols-2 xs:grid-cols-1 gap-1 w-1/2 xs:w-full sm:w-2/3 md:w-3/5',
    );
    this.createFooterInfo();
    this.createFooterInfoCount();
    this.render();
  }

  createFooterInfo(): void {
    this.footerInfoTotal = this.createElem(
      'div',
      'footerInfoTotal__title text-sm text-left',
      'Expenditure total:',
    );
    this.footerInfoAverage = this.createElem('div', 'average__title text-sm text-left', 'Average:');
    this.footerInfoTotalIncome = this.createElem(
      'div',
      'footerInfoTotalIncome__title text-sm text-left',
      'Total income:',
    );
    this.footerInfoRatio = this.createElem(
      'div',
      'footerInfoRatio__title text-sm text-left',
      'Expenditure/Income:',
    );
  }

  createFooterInfoCount(): void {
    this.footerInfoTotalCount = this.createElem(
      'div',
      'footerInfoTotalCount__title text-sm text-right xs:text-left',
      '2.885 $',
    );
    this.footerInfoAverageCount = this.createElem(
      'div',
      'averageCount__title text-sm text-right xs:text-left',
      '292.4 $/month',
    );
    this.footerInfoTotalIncomeCount = this.createElem(
      'div',
      'footerInfoTotalIncomeCount__title text-sm text-right xs:text-left',
      '3.100 $',
    );
    this.footerInfoRatioCount = this.createElem(
      'div',
      'footerInfoRatioCount__title text-sm text-right xs:text-left',
      '93.06 %',
    );
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
