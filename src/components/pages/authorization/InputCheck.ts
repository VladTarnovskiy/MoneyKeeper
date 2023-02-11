import { BaseComponent } from '../../base/baseComponent';

interface IInput {
  onclick: (event: Event) => void;
  checked: boolean;
  disabled: boolean;
}

export class InputCheck extends BaseComponent {
  node: HTMLElement;

  constructor(prop: IInput) {
    super();
    this.node = this.build(prop);
  }
  build(prop: IInput): HTMLElement {
    const input = this.appendElem(
      {
        div: {
          class: 'flex items-center',
        },
      },
      {
        input: {
          id: 'remember-me',
          disabled: prop.disabled,
          name: 'remember-me',
          type: 'checkbox',
          class: 'h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500',
          onclick: prop.onclick,
          checked: prop.checked,
        },
        label: {
          for: 'remember-me',
          class: 'ml-2 text-sm text-gray-900',
          textContent: 'New account',
        },
      },
    );

    return input;
  }
}
