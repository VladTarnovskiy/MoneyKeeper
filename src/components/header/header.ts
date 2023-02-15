import { BaseComponent } from '../base/baseComponent';

import { Account } from './account';
import { Logo } from './logo';
import { TotalCounter } from './totalCounter';

export class Header extends BaseComponent {
  root: HTMLElement;
  container: HTMLElement;
  logo: Logo;
  totalCounter: TotalCounter;
  account: Account;
  value = '10000';
  currency = '$';

  constructor(root: HTMLElement) {
    super();
    this.root = root;
    this.container = this.createElem(
      'header',
      ' container mx-auto flex justify-between p-3 pl-4 mb-4 text-sky-600',
    );
    this.logo = new Logo(this.container);
    this.totalCounter = new TotalCounter(this.container, this.value, this.currency);
    this.account = new Account(this.container);
  }

  render(): void {
    this.root.appendChild(this.container);
  }
}
