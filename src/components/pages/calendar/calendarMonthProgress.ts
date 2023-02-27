import { BaseComponent } from '@/components/base/baseComponent';

export class CalendarMonthProgress extends BaseComponent {
  root: HTMLElement;
  month: string;
  money: number;
  yearMoney: number;

  constructor(
    root: HTMLElement,
    month: string,
    money: number,
    yearMoney: number,
    currencySign: string,
  ) {
    super();
    this.root = root;
    this.month = month;
    this.yearMoney = yearMoney;
    this.money = money;
    const progressPercent = ((this.money / this.yearMoney) * 100).toFixed(1);
    const monthTitle: HTMLElement = this.createElem(
      'div',
      `${month}__title w-1/2 text-sky-600 dark:text-sky-800 text-xl`,
      `${this.textTranslate(`monthes.${month}`)}`,
    );

    const monthProgress: HTMLElement = this.createElem(
      'div',
      `${month}__progress h-4 bg-[#5eead4] relative`,
    );
    const monthCount: HTMLElement = this.createElem(
      'div',
      `${month}__count w-1/2 text-xl`,
      `${String(this.money) + currencySign}`,
    );
    const monthProgressSpan: HTMLElement = this.createElem(
      'span',
      `${month}__progress_span absolute -right-[3px] top-[-5px] translate-x-[100%] graph__item_checker h-4`,
      `${progressPercent}%`,
    );

    this.root.append(monthTitle, monthProgress, monthCount);

    if (this.money > 0) {
      monthProgress.style.width = `${Number(progressPercent) * 0.6}%`;
      monthProgress.append(monthProgressSpan);
    } else {
      monthProgress.style.width = '0px';
    }
  }
}
