import { BaseComponent } from '../../base/baseComponent';

interface IInput {
  onclick: (event: Event) => void;
  checked: boolean;
  disabled: boolean;
  label?: string;
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
          id: prop.label ?? 'remember',
          disabled: prop.disabled,
          name: prop.label ?? 'remember',
          type: 'checkbox',
          class: 'h-4 w-4 rounded border-gray-300 ml-2 text-indigo-600 focus:ring-indigo-500',
          onclick: prop.onclick,
          checked: prop.checked,
        },
        label: {
          for: prop.label ?? 'remember',
          class: 'ml-2 text-sm text-gray-900',
          textContent: prop.label ?? `${this.textTranslate('Authorization.Check')}`,
        },
      },
    );

    return input;
  }
}
