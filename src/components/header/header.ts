import type { Model } from '@/components/model/model';

import { BaseComponent } from '../base/baseComponent';

import { Account } from './account';
import { Logo } from './logo';
import { TotalCounter } from './totalCounter';

export class Header extends BaseComponent {
  node: HTMLElement;
  // container: HTMLElement;
  // logo!: Logo;
  // totalCounter!: TotalCounter;
  // account!: Account;
  // totalCounterContainer: HTMLElement;
  // value = 0;
  // currency = '$';
  model: Model;
  state: {
    value: number;
    currency: string;
  };

  constructor(model: Model) {
    super();
    this.model = model;
    this.state = {
      value: 0,
      currency: '$',
    };
    this.node = this.build();
  }

  build(): HTMLElement {
    const container = this.createElem(
      'header',
      ' container mx-auto flex justify-between p-3 pl-4 mb-4 items-center text-sky-600',
    );

    const totalCounterContainer = this.createElem('div', 'totalCounterContainer w-fit h-fit');
    // this.updateData();
    const logo = new Logo();

    // container.append(logo.node);
    const totalCounter = new TotalCounter(this.updateData(), this.model.currencySign);

    // this.totalCounterContainer = this.createElem('div', 'w-fit h-fit');
    // this.getTotalSum();
    // }

    totalCounterContainer.append(totalCounter.node);
    // container.appendChild(totalCounterContainer);
    const account = new Account(this.model);

    container.append(logo.node, totalCounterContainer, account.node);

    return container;
  }

  // getTotalSum(): void {
  //   this.updateData();
  //   this.logo = new Logo();
  //   this.container.append(this.logo.node);
  //   this.totalCounter = new TotalCounter(this.totalCounterContainer, this.value, this.currency);
  //   this.container.appendChild(this.totalCounterContainer);
  //   this.account = new Account(this.container, this.model);
  // }

  updateData(): number {
    let sum = 0;

    this.model.transaction.forEach((item) => {
      if (item.type === 'Income') {
        sum += item.sum;
      } else {
        sum -= item.sum;
      }
    });

    return sum;
  }

  // updateSum(): void {
  //   this.updateData();
  //   this.totalCounterContainer.replaceChildren();
  //   this.totalCounter = new TotalCounter(this.totalCounterContainer, this.value, this.currency);
  // }

  update(): void {
    const node = this.build();

    this.node.replaceWith(node);

    this.node = node;
  }

  // render(): void {
  //   this.root.appendChild(this.container);
  // }
}
