import { BaseComponent } from '@/components/base/baseComponent';

export class CalendarMonthProgress extends BaseComponent {
  root: HTMLElement;
  month: string;
  money: number;
  maxMonthMoney: number;

  constructor(
    root: HTMLElement,
    month: string,
    money: number,
    maxMonthMoney: number,
    currencySign: string,
  ) {
    super();
    this.root = root;
    this.month = month;
    this.maxMonthMoney = maxMonthMoney;
    this.money = money;
    const monthTitle: HTMLElement = this.createElem(
      'div',
      `${month}__title w-1/2 text-sky-600 dark:text-stone-700 text-xl`,
      `${this.textTranslate(`monthes.${month}`)}`,
    );
    const monthProgress: HTMLElement = this.createElem(
      'div',
      `${month}__progress h-4 bg-[#EF4444]`,
    );
    const monthCount: HTMLElement = this.createElem(
      'div',
      `${month}__count w-1/2 text-xl`,
      `${String(this.money) + currencySign}`,
    );

    this.root.append(monthTitle, monthProgress, monthCount);

    if (this.money > 0) {
      monthProgress.style.width = `${(this.money / this.maxMonthMoney) * 100}%`;
    } else {
      monthProgress.style.width = '0px';
    }
  }
}
