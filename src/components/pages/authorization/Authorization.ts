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
}

export class Authorization extends BaseComponent {
  root: HTMLElement;
  container!: HTMLElement;
  button!: HTMLElement;
  logo!: HTMLElement;
  form!: HTMLElement;
  message!: HTMLElement;
  inputCheck!: HTMLElement;
  state: IState;
  prop: IAuthorization;

  constructor(root: HTMLElement, prop: IAuthorization) {
    super();
    this.root = root;
    this.state = {
      status: 'login',
    };
    this.prop = prop;
    this.build();
    this.render();
  }

  build(): void {
    const container1 = this.createElem2('div', {
      class: '-space-y-px rounded-md shadow-sm',
    });
    const inputEmail = new InputEmail().node;
    const inputPassword = new InputPassword().node;

    container1.append(inputEmail, inputPassword);

    this.inputCheck = new InputCheck({ onclick: this.onclickRegistration.bind(this) }).node;

    this.button = new Button({ text: 'Sign in' }).node;

    this.form = this.createElem2('form', {
      class: 'mt-8 space-y-6',
      onsubmit: this.onsubmit.bind(this),
    });
    this.form.append(container1, this.inputCheck, this.button);
    this.logo = new Logo().node;
    this.message = this.createElem2('div', {
      class: 'h-6 mx-auto text-center text-red-500',
      textContent: '',
    });
    this.logo.append(this.message, this.form);
    this.container = this.createElem(
      'div',
      'flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8',
    );
    this.container.append(this.logo);
  }

  onclickRegistration(event: Event): void {
    const target = event.target as HTMLInputElement;

    target.checked ? (this.state.status = 'registration') : (this.state.status = 'login');

    const button = new Button({ text: `${target.checked ? 'Registration' : 'Sign in'}` }).node;

    this.button.replaceWith(button);
    this.button = button;
    this.form.onsubmit = this.onsubmit.bind(this);
  }

  async onsubmit(event: Event): Promise<void> {
    event.preventDefault();
    const target = event.target as HTMLFormElement;
    const email = target.querySelector<HTMLInputElement>('#email-address')?.value;
    const password = target.querySelector<HTMLInputElement>('#password')?.value;

    if (email && password) {
      const resp =
        this.state.status === 'registration'
          ? await this.prop.onregistration<IUserReq, IUser>({ email, password })
          : await this.prop.onlogin<IUserReq, IUser>({ email, password });

      if (resp.status === 201 || resp.status === 200) {
        this.state.status = 'login';
        this.button = this.replace(this.button, new Button({ text: 'Sign out' }).node);
        // this.logo = new Logo({text: 'You sign in account'}).node;
        const message = this.createElem2('div', {
          class: 'h-6 mx-auto text-center text-green-500',
          textContent: 'You sign in account',
        });

        this.message = this.replace(this.message, message);
        setTimeout(() => { location.hash = '#overview';}, 2000)
        localStorage.signIn = 'true'
      } else {
        const message = this.createElem2('div', {
          class: 'h-6 mx-auto text-center text-red-500',
          textContent: `${resp.message}`,
        });

        this.message = this.replace(this.message, message);
      }
    }
  }

  render(): void {
    this.root.append(this.container);
  }
}
