import { Account } from './account';
import { TotalCounter } from './totalCounter';
import { Logo } from './logo';
import { BaseComponent } from '../base/baseComponent';

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
    this.container = this.createElem('header', ' container mx-auto flex justify-between p-3 bg-sky-400');
    this.logo = new Logo(this.container);
    this.totalCounter = new TotalCounter(this.container, this.value, this.currency);
    this.account = new Account(this.container);
    // this.render();
  }

  render() {
    this.root.appendChild(this.container);
  }
}
