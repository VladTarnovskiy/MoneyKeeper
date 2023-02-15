import { BaseComponent } from '@/components/base/baseComponent';

export class CalendarMonthProgress extends BaseComponent {
  root: HTMLElement;
  month: string;
  money: string;

  constructor(root: HTMLElement, month: string, money: number) {
    super();
    this.root = root;
    this.month = month;
    this.money = String(money);
    const monthTitle: HTMLElement = this.createElem('div', `${month}__title w-1/2 text-xl`, month);
    const monthProgress: HTMLElement = this.createElem(
      'div',
      `${month}__progress h-4 w-3/5 bg-[#EF4444]`,
    );
    const monthCount: HTMLElement = this.createElem('div', `${month}__count w-1/2 text-xl`, this.money + '$');

    this.root.append(monthTitle, monthProgress, monthCount);
  }
}
