import type { Model } from '@/components/model/model';

import { BaseComponent } from '../base/baseComponent';

import { Account } from './Account';
import { Logo } from './Logo';
import { TotalCounter } from './TotalCounter';

export class Header extends BaseComponent {
  node: HTMLElement;
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

    const totalCounterContainer = this.createElem(
      'div',
      'totalCounterContainer ml-auto w-fit h-fit',
    );
    const logo = new Logo();
    const totalCounter = new TotalCounter(this.updateData(), this.model.currencySign);

    totalCounterContainer.append(totalCounter.node);
    const account = new Account(this.model);

    container.append(logo.node, totalCounterContainer, account.node);

    return container;
  }

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

  update(): void {
    const node = this.build();

    this.node.replaceWith(node);

    this.node = node;
  }
}
