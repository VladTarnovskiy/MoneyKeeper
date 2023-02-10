import { BaseComponent } from '@/components/base/baseComponent';
import type { IUser, IUserReq, PostJsonResponse } from '@/components/model/types';
import { Button } from '@/components/pages/authorization/Button';
import { InputCheck } from '@/components/pages/authorization/InputCheck';
import { InputEmail } from '@/components/pages/authorization/InputEmail';
import { InputPassword } from '@/components/pages/authorization/InputPassword';
import { Logo } from '@/components/pages/authorization/Logo';

interface IAuthorization {
  onlogin: <T, D = object>(data: D) => Promise<PostJsonResponse<T>>;
  onregistration: <T, D = object>(data: D) => Promise<PostJsonResponse<T>>;
}

interface IState {
  status: string;
  inputCheck: boolean;
  message: string;
}

export class Authorization extends BaseComponent {
  root: HTMLElement;
  container!: HTMLElement;
  button!: HTMLElement;
  logo!: HTMLElement;
  form!: HTMLElement;
  message!: HTMLElement;
  inputCheck!: HTMLElement;
  #state: IState;
  prop: IAuthorization;

  constructor(root: HTMLElement, prop: IAuthorization) {
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
    const container1 = this.createElem2('div', {
      class: '-space-y-px rounded-md shadow-sm',
    });
    const inputEmail = new InputEmail().node;
    const inputPassword = new InputPassword().node;

    container1.append(inputEmail, inputPassword);

    this.inputCheck = new InputCheck({
      onclick: this.onclickRegistration.bind(this),
      checked: this.state.inputCheck,
    }).node;
    this.button = new Button({
      text: `${this.state.status}`,
    }).node;

    this.form = this.createElem2('form', {
      class: 'mt-8 space-y-6',
      onsubmit: this.onsubmit.bind(this),
    });
    this.form.append(container1, this.inputCheck, this.button);
    this.logo = new Logo().node;
    this.message = this.createElem2('div', {
      class: `h-6 mx-auto text-center text-${
        this.state.status == 'Sign out' ? 'green' : 'red'
      }-500`,
      textContent: this.state.message,
    });
    this.logo.append(this.message, this.form);
    const container = this.createElem(
      'div',
      'flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8',
    );
    container.append(this.logo);
    return container;
  }

  onclickRegistration(event: Event): void {
    const target = event.target as HTMLInputElement;

    target.checked ? (this.state.status = 'Registration') : (this.state.status = 'Sign in');
    this.state.inputCheck = !this.state.inputCheck;
    this.state = this.state;
  }

  async onsubmit(event: Event): Promise<void> {
    event.preventDefault();
    const target = event.target as HTMLFormElement;
    const email = target.querySelector<HTMLInputElement>('#email-address')?.value;
    const password = target.querySelector<HTMLInputElement>('#password')?.value;

    if (email && password) {
      const resp =
        this.state.status === 'Registration'
          ? await this.prop.onregistration<IUserReq, IUser>({ email, password })
          : await this.prop.onlogin<IUserReq, IUser>({ email, password });

      if (resp.status === 201 || resp.status === 200) {
        this.state.status = 'Sign out';
        this.state.message = 'You sign in account';
        this.state = this.state;
      } else {
        this.state.message = resp.message;
        this.state = this.state;
      }
    }
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
