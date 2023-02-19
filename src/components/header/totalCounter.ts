import { BaseComponent } from '../base/baseComponent';

export class TotalCounter extends BaseComponent {
  root: HTMLElement;
  value: number;
  currency: string;
  constructor(root: HTMLElement, value: number, currency: string) {
    super();
    this.root = root;
    this.value = value;
    this.currency = currency;
    this.render();
  }
  render(): void {
    const totalSum = this.createElem('div', 'flex items-center logo text-2xl');
    const totalSumTitle = this.createElem(
      'div',
      'logo__title ml-2 text-sky-600 dark:font-semibold dark:text-stone-600 font-light xs:hidden',
      `${this.textTranslate('Header.balance')}: `,
    );
    const totalSumCounter = this.createElem(
      'div',
      'logo__title ml-2 text-sky-600 dark:font-semibold dark:text-stone-600',
      `${this.value} ${this.currency}`,
    );

    totalSum.append(totalSumTitle, totalSumCounter);
    this.root.appendChild(totalSum);
  }
}
