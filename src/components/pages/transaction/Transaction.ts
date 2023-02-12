import { BaseComponent } from '@/components/base/baseComponent';

import { baseCategoryIncomeDataEng } from '@/components/base/baseCategoryData';
// import type {
//   IUser,
//   IUserReq,
//   PostJsonResponse,
//   ISetting,
//   ISettingReq,
//   IUserDataReq,
// } from '@/components/model/types';
// import { Button } from '@/components/pages/authorization/Button';
// import { InputCheck } from '@/components/pages/authorization/InputCheck';
// import { InputSelect } from '@/components/base/inputSelect';
// import { InputEmail } from '@/components/pages/authorization/InputEmail';
// import { InputName } from '@/components/pages/authorization/InputName';
// import { InputPassword } from '@/components/pages/authorization/InputPassword';
import { InputType } from '@/components/pages/transaction/InputType';

// import { Logo } from '@/components/pages/authorization/Logo';

// interface IAuthorization {
//   onlogin: <T, D = object>(data: D) => Promise<PostJsonResponse<T>>;
//   onregistration: <T, D = object>(data: D) => Promise<PostJsonResponse<T>>;
//   onsetting: <T>(dataU: ISetting) => Promise<PostJsonResponse<T>>;
//   ongetuser: <T>() => Promise<PostJsonResponse<T>>;
// }

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
  //   prop: IAuthorization;

  constructor(root: HTMLElement) {
    super();
    this.root = root;
    this.#state = {
      status: 'Sign in',
      inputCheck: false,
      message: '',
    };
    // this.prop = prop;

    this.render();
    // this.ongetuser().catch((err: string) => new Error(err));
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
      class: 'grid grid-cols-1 gap-6',
    });

    const inputType = new InputType({ title: 'Type notes', options: ['Expense', 'Income'] }).node;
    const inputType2 = new InputType({ title: 'Category', options: baseCategoryIncomeDataEng })
      .node;

    // const inputSelect = new InputSelect(container1, 'Sort by', ['DateInc', 'DateDec', 'SumInc', 'SumDec']);
    // const inputName = this.state.status === 'Registration' ? new InputName().node : '';
    // const inputEmail = new InputEmail({ disabled: this.state.status === 'Sign out' }).node;
    // const inputPassword = new InputPassword({ disabled: this.state.status === 'Sign out' }).node;

    container1.append(inputType, inputType2);

    // const inputCheck = new InputCheck({
    //   onclick: this.onclickRegistration.bind(this),
    //   checked: this.state.inputCheck,
    //   disabled: this.state.status === 'Sign out',
    // }).node;
    // const button = new Button({
    //   text: `${this.state.status}`,
    // }).node;

    // const form = this.createElem2('form', {
    //   class: 'mt-8 space-y-6',
    //   onsubmit:
    //     this.state.status === 'Sign out' ? this.onsignout.bind(this) : this.onsubmit.bind(this),
    // });

    // form.append(container1, inputCheck, button);

    // const logo = new Logo({
    //   text:
    //     this.state.status === 'Registration' ? 'New account in the app' : 'Sign in to your account',
    // }).node;
    // const message = this.createElem2('div', {
    //   class: `h-6 mx-auto text-center text-${
    //     this.state.status === 'Sign out' || this.state.status === 'Sign in' ? 'green' : 'red'
    //   }-500`,
    //   textContent: this.state.message,
    // });

    // logo.append(message, form); grid grid-cols-1 gap-6
    const container2 = this.createElem('div', 'mt-8 max-w-md');
    const container = this.createElem('div', 'antialiased text-gray-900 px-6');

    container2.append(container1);

    container.append(title, container2);

    return container;
  }

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
