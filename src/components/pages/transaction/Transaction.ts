import { baseCategoryIncomeDataEng } from '@/components/base/baseCategoryData';
import { BaseComponent } from '@/components/base/baseComponent';
import type { ITransactionReq, ITransaction, PostJsonResponse } from '@/components/model/types';
import { Button } from '@/components/pages/authorization/Button';
import { InputElem } from '@/components/pages/transaction/InputElem';
import { InputElemArea } from '@/components/pages/transaction/InputElemArea';
import { InputSelect } from '@/components/pages/transaction/InputSelect';

interface ITransactionProp {
  onSetTransaction: <T>(dataU: ITransaction) => Promise<PostJsonResponse<T>>;
}

interface IState {
  status: string;
  inputCheck: boolean;
  message: string;
}

export class Transaction extends BaseComponent {
  root: HTMLElement;
  container!: HTMLElement;
  button!: HTMLElement;
  logo!: HTMLElement;
  form!: HTMLElement;
  message!: HTMLElement;
  inputCheck!: HTMLElement;
  #state: IState;
  prop: ITransactionProp;

  constructor(root: HTMLElement, prop: ITransactionProp) {
    super();
    this.root = root;
    this.#state = {
      status: 'Sign in',
      inputCheck: false,
      message: '',
    };
    this.prop = prop;

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
      class: '<page__title ml-2 text-3xl text-sky-600 mb-5',
      textContent: 'Transactions',
    });
    const container1 = this.createElem2('div', {
      class: 'grid grid-cols-1 gap-6 col-span-2',
    });

    const inputType = new InputSelect({ title: 'Type notes', options: ['Expense', 'Income'] }).node;
    const inputCategory = new InputSelect({ title: 'Category', options: baseCategoryIncomeDataEng })
      .node;

    const inputDate = new InputElem({ title: 'Date', type: 'date' }).node;

    container1.append(inputType, inputCategory, inputDate);

    const container3 = this.createElem2('div', {
      class: 'grid grid-cols-1 gap-6 col-start-3 col-span-2',
    });

    const inputSum = new InputElem({ title: 'Amount', type: 'number' }).node;
    const inputSubcat = new InputElem({ title: 'Subcategory', type: 'text' }).node;
    const inputTime = new InputElem({ title: 'Time', type: 'time' }).node;

    container3.append(inputSum, inputSubcat, inputTime);

    const inputDescription = new InputElemArea({ title: 'Description', type: 'textarea' }).node;

    const button = new Button({
      text: 'Save',
    }).node;
    const container2 = this.createElem('div', 'grid grid-cols-4 mt-8 mb-4 gap-4');
    const container = this.createElem2('form', {
      class: 'antialiased text-gray-900 px-6',
      onsubmit: (event) => {
        event.preventDefault();
        this.onsubmit(event).catch((err: string) => new Error(err));
      },
    });

    container2.append(container1, container3, inputDescription);

    container.append(title, container2, button);

    return container;
  }

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

    const resp = await this.prop.onSetTransaction<ITransactionReq>(set);

    if (resp.status === 201 || resp.status === 200) {
      this.update();
    }
  };

  render(): void {
    this.container = this.build();
    this.root.append(this.container);
  }

  update(): void {
    const container = this.build();

    this.container.replaceWith(container);

    this.container = container;
  }
}
