import { BaseComponent } from '../../base/baseComponent';

interface IInputPassword {
  disabled: boolean;
}

export class InputPassword extends BaseComponent {
  node: HTMLElement;

  constructor(prop: IInputPassword) {
    super();
    this.node = this.build(prop);
  }
  build(prop: IInputPassword): HTMLElement {
    const input = this.appendElem(
      {
        div: {},
      },
      {
        label: {
          for: 'password',
          class: 'sr-only',
          textContent: 'Password',
        },
        input: {
          id: 'password',
          disabled: prop.disabled,
          name: 'password',
          placeholder: 'Password',
          required: true,
          autocomplete: 'current-password',
          type: 'password',
          class:
            'relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm',
        },
      },
    );

    return input;
  }
}
