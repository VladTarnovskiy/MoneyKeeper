import { BaseComponent } from '@/components/base/baseComponent';
import type {
  IUser,
  IUserReq,
  PostJsonResponse,
  ISetting,
  ISettingReq,
  IUserDataReq,
} from '@/components/model/types';
import { Button } from '@/components/pages/authorization/Button';
import { InputCheck } from '@/components/pages/authorization/InputCheck';
import { InputEmail } from '@/components/pages/authorization/InputEmail';
import { InputName } from '@/components/pages/authorization/InputName';
import { InputPassword } from '@/components/pages/authorization/InputPassword';
import { Logo } from '@/components/pages/authorization/Logo';

interface IAuthorization {
  onlogin: <T, D = object>(data: D) => Promise<PostJsonResponse<T>>;
  onregistration: <T, D = object>(data: D) => Promise<PostJsonResponse<T>>;
  onsetting: <T>(dataU: ISetting) => Promise<PostJsonResponse<T>>;
  ongetuser: <T>() => Promise<PostJsonResponse<T>>;
}

interface IState {
  status: string;
  inputCheck: boolean;
  message: string;
}

const defaultSetting: ISetting = {
  name: '',
  lang: 'en',
  theme: 'white',
  currency: 'usd',
  userId: 0,
};

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
    this.ongetuser().catch((err: string) => new Error(err));
  }

  set state(state: IState) {
    this.#state = state;
    this.update();
  }

  get state(): IState {
    return this.#state;
  }

  async ongetuser(): Promise<void> {
    const resp = await this.prop.ongetuser<IUserDataReq>();

    if (resp.status === 200) {
      this.state.status = 'Sign out';
      this.state.message = `You sign in account: ${resp.data === undefined ? '' : resp.data.email}`;
      this.state = this.state;
    }
  }

  build(): HTMLElement {
    const container1 = this.createElem2('div', {
      class: '-space-y-px rounded-md shadow-sm',
    });
    const inputName = this.state.status === 'Registration' ? new InputName().node : '';
    const inputEmail = new InputEmail({ disabled: this.state.status === 'Sign out' }).node;
    const inputPassword = new InputPassword({ disabled: this.state.status === 'Sign out' }).node;

    container1.append(inputName, inputEmail, inputPassword);

    const inputCheck = new InputCheck({
      onclick: this.onclickRegistration.bind(this),
      checked: this.state.inputCheck,
      disabled: this.state.status === 'Sign out',
    }).node;
    const button = new Button({
      text: `${this.state.status}`,
    }).node;

    const form = this.createElem2('form', {
      class: 'mt-8 space-y-6',
      onsubmit: this.state.status === 'Sign out' ? this.onsignout.bind(this) : this.onsubmit.bind(this),
    });

    form.append(container1, inputCheck, button);

    const logo = new Logo({
      text:
        this.state.status === 'Registration' ? 'New account in the app' : 'Sign in to your account',
    }).node;
    const message = this.createElem2('div', {
      class: `h-6 mx-auto text-center text-${
        this.state.status === 'Sign out' || this.state.status === 'Sign in' ? 'green' : 'red'
      }-500`,
      textContent: this.state.message,
    });

    logo.append(message, form);
    const container = this.createElem(
      'div',
      'flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8',
    );

    container.append(logo);

    return container;
  }

  onclickRegistration(event: Event): void {
    const target = event.target as HTMLInputElement;

    target.checked ? (this.state.status = 'Registration') : (this.state.status = 'Sign in');
    this.state.inputCheck = !this.state.inputCheck;
    this.state.message = '';
    this.state = this.state;
  }

  async onsubmit(event: Event): Promise<void> {
    event.preventDefault();
    const target = event.target as HTMLFormElement;
    const email = target.querySelector<HTMLInputElement>('#email-address')?.value;
    const password = target.querySelector<HTMLInputElement>('#password')?.value;
    const name = target.querySelector<HTMLInputElement>('#user-name')?.value;

    defaultSetting.name = name ?? '';

    if (email && password) {
      const resp =
        this.state.status === 'Registration'
          ? await this.prop.onregistration<IUserReq, IUser>({ email, password })
          : await this.prop.onlogin<IUserReq, IUser>({ email, password });

      if (resp.status === 201 || resp.status === 200) {
        const resp2 =
          resp.status === 201 ? await this.prop.onsetting<ISettingReq>(defaultSetting) : null;

        this.state.status = 'Sign out';
        this.state.message =
          resp2 === null
            ? `You sign in account: ${resp.data === undefined ? '' : resp.data.user.email}`
            : `A new account has been created: ${
                resp.data === undefined ? '' : resp.data.user.email
              }`;
        this.state = this.state;
      } else {
        this.state.message = resp.message;
        this.state = this.state;
      }
    }
  }
  onsignout(): void {
    this.state.status = 'Sign in';
    this.state.message = 'You sign out';
    localStorage.userdata = '';
    this.state = this.state;
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