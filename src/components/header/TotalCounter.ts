import { BaseComponent } from '../base/baseComponent';

export class TotalCounter extends BaseComponent {
  node: HTMLElement;
  value: number;
  currency: string;
  constructor(value: number, currency: string) {
    super();
    this.value = value;
    this.currency = currency;
    this.node = this.render();
  }

  render(): HTMLElement {
    const totalSum = this.createElem('div', 'flex items-center logo text-2xl');
    const totalSumTitle = this.createElem(
      'div',
      'logo__title ml-2 text-sky-600 dark:text-stone-600 font-light xs:hidden',
      `${this.textTranslate('Header.balance')}: `,
    );
    const totalSumCounter = this.createElem(
      'div',
      'logo__title ml-2 text-sky-600 dark:font-semibold dark:text-stone-600',
      `${this.value} ${this.currency}`,
    );

    totalSum.append(totalSumTitle, totalSumCounter);

    return totalSum;
  }
}
