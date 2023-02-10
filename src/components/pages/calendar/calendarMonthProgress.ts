import { BaseComponent } from '@/components/base/baseComponent';

export class CalendarMonthProgress extends BaseComponent {
  root: HTMLElement;
  month: string;

  constructor(root: HTMLElement, month: string) {
    super();
    this.root = root;
    this.month = month;
    const monthTitle: HTMLElement = this.createElem('div', `${month}__title w-1/2 text-xl`, month);
    const monthProgress: HTMLElement = this.createElem(
      'div',
      `${month}__progress h-4 w-3/5 bg-[#EF4444]`,
    );
    const monthCount: HTMLElement = this.createElem('div', `${month}__count w-1/2 text-xl`, '100$');

    this.root.append(monthTitle, monthProgress, monthCount);
  }
}
