import { BaseComponent } from '@/components/base/baseComponent';

import { PeriodItem } from './periodItem';

export class TransactionPeriod extends BaseComponent {
  root: HTMLElement;
  periodItems: HTMLElement;
  periodItemDay: PeriodItem | undefined;
  periodItemWeek: PeriodItem | undefined;
  periodItemMonth: PeriodItem | undefined;
  periodItemYear: PeriodItem | undefined;
  periodItemAll: PeriodItem | undefined;

  constructor(root: HTMLElement) {
    super();
    this.root = root;
    this.periodItems = this.createElem('div', 'period__items flex flex-col');
    this.renderPeriodItems();
    this.render();
  }

  renderPeriodItems(): void {
    this.periodItemDay = new PeriodItem(this.periodItems, '#ef4444', 'Today', '1');
    this.periodItemWeek = new PeriodItem(this.periodItems, '#3b82f6', 'This Week', '7');
    this.periodItemMonth = new PeriodItem(this.periodItems, '#10b981', 'This Month', '31');
    this.periodItemYear = new PeriodItem(this.periodItems, '#a855f7', 'This Year', '365');
    this.periodItemAll = new PeriodItem(this.periodItems, '#f59e0b', 'All Time', 'All');
  }

  render(): void {
    const container = this.createElem('div', 'period__container flex flex-col');
    const periodTitle = this.createElem(
      'div',
      'period__title text-2xl mb-11 font-light text-sky-600',
      'Expense vs Income',
    );

    container.append(periodTitle, this.periodItems);
    this.root.appendChild(container);
  }
}
