import { BaseComponent } from '../base/baseComponent';

export class TotalCounter extends BaseComponent {
  root: HTMLElement;
  value: string;
  currency: string;
  constructor(root: HTMLElement, value: string, currency: string) {
    super();
    this.root = root;
    this.value = value;
    this.currency = currency;
    this.render();
  }
  render(): void {
    const totalSum = this.createElem('div', 'flex items-center logo text-2xl');
    const totalSumTitle = this.createElem('div', 'logo__title ml-2 text-white', 'Total Balance:');
    const totalSumCounter = this.createElem(
      'div',
      'logo__title ml-2 text-white',
      `${this.value} ${this.currency}`,
    );

    totalSum.append(totalSumTitle, totalSumCounter);
    this.root.appendChild(totalSum);
  }
}
