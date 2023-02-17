// import { svgStore } from '@/assets/svgStore';

import { BaseComponent } from '../../base/baseComponent';

interface IButton {
  text: string;
  style?: string;
  disabled?: boolean;
  type?: string;
  onClick: (this: GlobalEventHandlers, event: MouseEvent) => void;
}

export class Button extends BaseComponent {
  node: HTMLElement;

  constructor(prop: IButton) {
    super();
    this.node = this.createElem2('div', {
      class: 'flex justify-end',
    });
    this.build(prop);
  }
  build(prop: IButton): void {
    const tmp: {
      Delete: string;
      Save: string;
      Reset: string;
      'Sign in': string;
      'Save settings': string;
      'Sign out': string;
      Registration: string;
    } = {
      Delete: this.textTranslate('Settings.Button2'),
      Save: this.textTranslate('Transaction.Save'),
      Reset: this.textTranslate('Transaction.Reset'),
      'Save settings': this.textTranslate('Settings.Button1'),
      'Sign in': this.textTranslate('Authorization.Button1'),
      'Sign out': this.textTranslate('Authorization.Button3'),
      Registration: this.textTranslate('Authorization.Button2'),
    };
    const button = this.appendElem(
      {
        button: {
          type: prop.type === 'button' ? 'button' : 'submit',
          class: `group ${
            prop.disabled === undefined ? '' : 'disabled:opacity-50'
          } relative flex w-60 justify-center rounded-md border border-transparent ${
            prop.text === 'Delete' ? 'bg-red-400' : 'bg-sky-400'
          } py-2 px-4 text-sm font-medium text-white ${
            prop.text === 'Delete' ? 'hover:bg-red-600' : 'hover:bg-sky-500'
          } focus:outline-none focus:ring-2 focus:${
            prop.text === 'Delete' ? 'bg-red-600' : 'bg-sky-500'
          } focus:ring-offset-2`,
          textContent: String(tmp[prop.text]),
          disabled: prop.disabled ?? false,
          onclick: prop.onClick,
        },
      },
      {
        span: {
          class: 'absolute inset-y-0 left-0 flex items-center pl-3',
        },
      },
    );

    this.node.append(button);
  }
}
