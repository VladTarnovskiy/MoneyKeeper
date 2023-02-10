import { BaseComponent } from '../../base/baseComponent';

// interface IInput {
//   text: string;
//   style?: string;
// }

export class InputEmail extends BaseComponent {
  node: HTMLElement;

  constructor() {
    super();
    this.node = this.build();
  }
  build(): HTMLElement {
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
          name: 'email',
          placeholder: 'Email address',
          required: 'true',
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
