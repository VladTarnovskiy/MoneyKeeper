import { svgStore } from '@/assets/svgStore';

import { BaseComponent } from '../../base/baseComponent';

interface IButton {
  text: string;
  style?: string;
}

export class Button extends BaseComponent {
  node: HTMLElement;

  constructor(prop: IButton) {
    super();
    this.node = this.createElem2('div', {});
    this.build(prop);
  }
  build(prop: IButton): void {
    const button = this.appendElem(
      {
        button: {
          type: 'submit',
          class:
            'group relative flex w-full justify-center rounded-md border border-transparent bg-sky-400 py-2 px-4 text-sm font-medium text-white hover:bg-sky-500 focus:outline-none focus:ring-2 focus:bg-sky-500 focus:ring-offset-2',
          textContent: `${prop.text}`,
        },
      },
      {
        span: {
          class: 'absolute inset-y-0 left-0 flex items-center pl-3',
          innerHtml: svgStore.lock,
        },
      },
    );

    this.node.append(button);
  }
}
