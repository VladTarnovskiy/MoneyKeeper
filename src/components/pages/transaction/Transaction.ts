import {
  baseCategoryIncomeDataEng,
  baseCategoryExpenditureDataEng,
} from '@/components/base/baseCategoryData';
import { BaseComponent } from '@/components/base/baseComponent';
import type { Model } from '@/components/model/model';
import type { ITransactionReq, ITransaction } from '@/components/model/types';
import { Button } from '@/components/pages/authorization/Button';
import { InputElem } from '@/components/pages/transaction/InputElem';
import { InputElemArea } from '@/components/pages/transaction/InputElemArea';
import { InputSelect } from '@/components/pages/transaction/InputSelect';

interface IState {
  status: string;
  message: string;
  type: string;
  category: string;
  date: string;
  time: string;
  amount: number;
  subcategory: string;
  description: string;
}

export class Transaction extends BaseComponent {
  root: HTMLElement;
  container: HTMLElement;
  #state: IState;
  model: Model;

  constructor(root: HTMLElement, model: Model) {
    super();
    this.root = root;
    this.#state = {
      status: '',
      message: '',
      type: 'Income',
      category: 'Salary',
      date: '',
      time: '',
      amount: 0,
      subcategory: '',
      description: '',
    };
    this.model = model;
    this.container = this.build();

    this.render();
  }

  set state(state: IState) {
    this.#state = state;
    this.update();
  }

  get state(): IState {
    return this.#state;
  }

  build(): HTMLElement {
    const title = this.createElem2('div', {
      class: 'page__title ml-2 text-3xl text-sky-600 bg-sky-100 rounded pl-2 mb-5',
      textContent: 'Transactions',
    });
    const container1 = this.createElem2('div', {
      class: 'grid grid-cols-1 gap-6 col-span-2',
    });

    const inputType = new InputSelect({
      title: 'Type notes',
      options: ['Expense', 'Income'],
      onchange: this.onChangeType,
      value: this.state.type,
    }).node;
    const inputCategory = new InputSelect({
      title: 'Category',
      options:
        this.state.type === 'Income' ? baseCategoryIncomeDataEng : baseCategoryExpenditureDataEng,
      onchange: this.onChangeCategory,
      value: this.state.category,
    }).node;

    const inputDate = new InputElem({ title: 'Date', type: 'date' }).node;

    const container3 = this.createElem2('div', {
      class: 'grid grid-cols-1 gap-6 col-start-3 col-span-2',
    });

    const inputSum = new InputElem({ title: 'Amount', type: 'number' }).node;
    const inputSubcategory = new InputElem({ title: 'Subcategory', type: 'text' }).node;
    const inputTime = new InputElem({ title: 'Time', type: 'time' }).node;

    container1.append(inputType, inputCategory, inputSubcategory);
    container3.append(inputSum, inputDate, inputTime);

    const inputDescription = new InputElemArea({ title: 'Description', type: 'textarea' }).node;

    const button = new Button({
      text: 'Save',
      onClick: () => {
        return;
      },
    }).node;
    const message = this.createElem2('div', {
      class: `h-12 mx-auto text-center text-${this.state.status === '200' ? 'green' : 'red'}-500`,
      textContent: this.state.message,
    });

    const container2 = this.createElem('div', 'grid grid-cols-4 mt-8 mb-4 gap-4');
    const container = this.createElem2('form', {
      class: 'antialiased text-gray-900 px-1',
      onsubmit: (event) => {
        event.preventDefault();
        this.onsubmit(event).catch((err: string) => new Error(err));
      },
    });

    container2.append(container1, container3, inputDescription);

    container.append(title, message, container2, button);

    return container;
  }

  onChangeType = (event: Event): void => {
    const target = event.target as HTMLInputElement;

    this.state.message = '';
    this.state.type = target.value;
    this.update();
  };

  onChangeCategory = (event: Event): void => {
    const target = event.target as HTMLInputElement;

    this.state.message = '';
    this.state.category = target.value;
    this.update();
  };
  onsubmit = async (event: Event): Promise<void> => {
    const target = event.target as HTMLFormElement;

    const formElement = target.elements;

    const set: ITransaction = {
      type: '',
      category: '',
      subcategory: '',
      description: '',
      date: '',
      time: '',
      sum: 0,
      userId: 0,
    };

    for (const iterator of formElement) {
      const element: HTMLFormElement = iterator as HTMLFormElement;

      if (element.id === 'sum' || element.id === 'userID') {
        set[element.id] = Number(element.value);
      } else if (element.id.length !== 0) {
        set[element.id] = String(element.value);
      }
    }

    const resp = await this.model.setTransactions<ITransactionReq>(set);

    if (resp.status === 201 || resp.status === 200) {
      this.state.message = 'Transaction save';
      this.state.status = '200';
      this.update();
    } else {
      this.state.message = 'Transaction fault';
      this.state.status = '400';
      this.update();
    }
  };

  render(): void {
    this.root.append(this.container);
  }

  update(): void {
    const container = this.build();

    this.container.replaceWith(container);

    this.container = container;
  }
}
