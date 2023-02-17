import type { Model } from '@/components/model/model';

import { BaseComponent } from '../base/baseComponent';

import { Account } from './account';
import { Logo } from './logo';
import { TotalCounter } from './totalCounter';

export class Header extends BaseComponent {
  root: HTMLElement;
  container: HTMLElement;
  logo!: Logo;
  totalCounter!: TotalCounter;
  account!: Account;
  totalCounterContainer: HTMLElement;
  value = 0;
  currency = '$';
  model: Model;

  constructor(root: HTMLElement, model: Model) {
    super();
    this.root = root;
    this.model = model;

    this.container = this.createElem(
      'header',
      ' container mx-auto flex justify-between p-3 pl-4 mb-4 items-center text-sky-600',
    );

    this.totalCounterContainer = this.createElem('div', 'totalCounterContainer w-fit h-fit');
    this.getTotalSum();
  }

  getTotalSum(): void {
    this.updateData();
    this.logo = new Logo(this.container);
    this.totalCounter = new TotalCounter(this.totalCounterContainer, this.value, this.currency);
    this.container.appendChild(this.totalCounterContainer);
    this.account = new Account(this.container, this.model);
  }

  updateData(): void {
    let sum = 0;

    this.model.transaction.forEach((item) => {
      if (item.type === 'Income') {
        sum += item.sum;
      } else {
        sum -= item.sum;
      }
    });
    this.value = sum;
  }

  updateSum(): void {
    this.updateData();
    this.totalCounterContainer.replaceChildren();
    this.totalCounter = new TotalCounter(this.totalCounterContainer, this.value, this.currency);
  }

  render(): void {
    this.root.appendChild(this.container);
  }
}
