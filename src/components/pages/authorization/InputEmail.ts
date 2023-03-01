import { BaseComponent } from '../../base/baseComponent';

interface IInputEmail {
  disabled: boolean;
}

export class InputEmail extends BaseComponent {
  node: HTMLElement;

  constructor(prop: IInputEmail) {
    super();
    this.node = this.build(prop);
  }
  build(prop: IInputEmail): HTMLElement {
    const input = this.appendElem(
      {
        div: {},
      },
      {
        label: {
          for: 'email-address',
          class: 'sr-only',
          textContent: 'Email address',
        },
        input: {
          id: 'email-address',
          disabled: prop.disabled,
          name: 'email',
          placeholder: 'Email address',
          required: true,
          autocomplete: 'email',
          type: 'email',
          class:
            'relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm',
        },
      },
    );

    return input;
  }
}
