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
    const button = this.appendElem(
      {
        button: {
          type: prop.type ?? 'submit',
          class: `group ${
            prop.disabled === undefined ? '' : 'disabled:opacity-50'
          } relative flex w-60 justify-center rounded-md border border-transparent bg-sky-400 dark:bg-gray-800 py-2 px-4 text-sm font-medium text-white hover:bg-sky-500 focus:outline-none focus:ring-2 focus:bg-sky-500 focus:ring-offset-2`,
          textContent: `${prop.text}`,
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
