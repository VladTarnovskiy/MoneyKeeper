// import { t } from 'i18next';
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
  updateHeaderSum: () => void;

  constructor(root: HTMLElement, model: Model, updateHeaderSum: () => void) {
    super();
    this.root = root;
    this.updateHeaderSum = updateHeaderSum;
    this.#state = {
      status: '',
      message: '',
      type: `${this.textTranslate('Transaction.Income')}`,
      category: `${this.textTranslate('CategoryIncome.Salary')}`,
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

  resetMsg(): void {
    this.state.message = '';
  }
  reset = (): void => {
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
    this.update();
  };

  set state(state: IState) {
    this.#state = state;
    this.update();
  }

  get state(): IState {
    return this.#state;
  }

  build(): HTMLElement {
    const title = this.createElem2('div', {
      class:
        'page__title ml-2 text-3xl text-sky-600 dark:font-semibold dark:text-sky-900 dark:bg-gray-400 bg-sky-100 rounded pl-2 mb-5',
      textContent: `${this.textTranslate('Transaction.Title')}`,
    });
    const container1 = this.createElem2('div', {
      class: 'grid grid-cols-1 gap-6 col-span-2 md:col-span-4',
    });

    const inputType = new InputSelect({
      title: 'Type notes',
      options: ['Expense', 'Income'],
      optionsLang: [
        this.textTranslate('Transaction.Expense'),
        this.textTranslate('Transaction.Income'),
      ],
      onchange: this.onChangeType,
      value: this.state.type,
    }).node;
    const inDataEng: string[] = baseCategoryIncomeDataEng.map((item) => {
      return this.textTranslate(`CategoryIncome.${item}`);
    });
    const exDataEng: string[] = baseCategoryExpenditureDataEng.map((item) => {
      return this.textTranslate(`CategoryExpenditure.${item}`);
    });
    const inputCategory = new InputSelect({
      title: 'Category',
      options:
        this.state.type === 'Income' ? baseCategoryIncomeDataEng : baseCategoryExpenditureDataEng,
      optionsLang: this.state.type === 'Income' ? inDataEng : exDataEng,
      onchange: this.onChangeCategory,
      value: this.state.category,
    }).node;

    const inputDate = new InputElem({ title: 'date', type: 'date', value: this.state.date }).node;

    const container3 = this.createElem2('div', {
      class: 'grid grid-cols-1  gap-6 col-start-3 col-span-2 md:mt-2 md:col-span-4',
    });

    const inputSum = new InputElem({
      title: 'amount',
      type: 'number',
      value: String(this.state.amount),
    }).node;
    const inputSubcategory = new InputElem({
      title: 'subcategory',
      type: 'text',
      value: this.state.subcategory,
    }).node;
    const inputTime = new InputElem({ title: 'time', type: 'time', value: this.state.time }).node;

    container1.append(inputType, inputCategory, inputSubcategory);
    container3.append(inputSum, inputDate, inputTime);

    const inputDescription = new InputElemArea({
      title: 'Description',
      type: 'textarea',
      value: this.state.description,
    }).node;

    const button = new Button({
      text: 'save',
      onClick: () => {
        return;
      },
    }).node;
    const buttonClean = new Button({
      text: 'reset',
      onClick: this.reset,
      type: 'button',
    }).node;
    const message = this.createElem2('div', {
      class: `h-12 mx-auto text-center text-${this.state.status === '200' ? 'green' : 'red'}-500`,
      textContent: this.state.message,
    });

    const container2 = this.createElem('div', 'grid grid-cols-4 mt-8 mb-4 gap-4');
    const container4 = this.createElem(
      'div',
      'flex flex-row justify-end mt-8 mb-4 gap-4 md:flex-col',
    );

    container4.append(buttonClean, button);
    const container = this.createElem2('form', {
      class: 'antialiased text-gray-900 px-1 border rounded',
      onsubmit: (event) => {
        event.preventDefault();
        this.onsubmit(event).catch((err: string) => new Error(err));
      },
    });

    container2.append(container1, container3, inputDescription);

    container.append(container2, container4);
    const containerFull = this.createElem('div', 'content__container flex flex-col');

    containerFull.append(title, message, container);

    return containerFull;
  }

  onChangeType = (event: Event): void => {
    const target = event.target as HTMLInputElement;

    this.state.message = '';
    this.state.type = target.value;
    this.saveValue();

    this.update();
  };

  saveValue(): void {
    const amount: HTMLInputElement | null = this.container.querySelector('#sum');
    const date: HTMLInputElement | null = this.container.querySelector('#date');
    const time: HTMLInputElement | null = this.container.querySelector('#time');
    const subcategory: HTMLInputElement | null = this.container.querySelector('#subcategory');
    const description: HTMLTextAreaElement | null = this.container.querySelector('#description');

    this.state.amount = amount === null ? 0 : Number(amount.value);
    this.state.date = date === null ? '' : String(date.value);
    this.state.time = time === null ? '' : String(time.value);
    this.state.subcategory = subcategory === null ? '' : String(subcategory.value);
    this.state.description = description === null ? '' : String(description.value);
  }

  onChangeCategory = (event: Event): void => {
    const target = event.target as HTMLInputElement;

    this.state.message = '';
    this.state.category = target.value;
    this.saveValue();
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
      this.state.message = `${this.textTranslate('Transaction.Message1')}`;
      this.state.status = '200';
      this.update();
      this.updateHeaderSum();
    } else {
      this.state.message = `${this.textTranslate('Transaction.Message2')}`;
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
