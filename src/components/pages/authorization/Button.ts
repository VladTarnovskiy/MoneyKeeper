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
      delete: string;
      save: string;
      reset: string;
      signIn: string;
      saveSettings: string;
      signOut: string;
      registration: string;
      exit: string;
      apply: string;
    } = {
      delete: this.textTranslate('Settings.Button2'),
      save: this.textTranslate('Transaction.Save'),
      reset: this.textTranslate('Transaction.Reset'),
      saveSettings: this.textTranslate('Settings.Button1'),
      signIn: this.textTranslate('Authorization.Button1'),
      signOut: this.textTranslate('Authorization.Button3'),
      registration: this.textTranslate('Authorization.Button2'),
      exit: this.textTranslate('Header.exit'),
      apply: this.textTranslate('Settings.Button3'),
    };
    const button = this.appendElem(
      {
        button: {
          type: prop.type === 'button' ? 'button' : 'submit',
          class: `group ${
            prop.disabled === undefined ? '' : 'disabled:opacity-50'
          } relative dark:bg-stone-500 flex w-60 md:w-40 justify-center rounded-md border border-transparent ${
            prop.text === 'delete' ? 'bg-red-400 dark:bg-red-400' : 'bg-sky-400'
          } py-2 px-4 text-sm font-medium text-white ${
            prop.text === 'delete' ? 'hover:bg-red-600' : 'hover:bg-sky-500'
          } focus:outline-none focus:ring-2 focus:${
            prop.text === 'delete' ? 'bg-red-600 dark:bg-red-600' : 'bg-sky-500'
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
