import { BaseComponent } from '../../base/baseComponent';

interface ILogo {
  text: string;
}

export class Logo extends BaseComponent {
  node: HTMLElement;

  constructor(prop: ILogo) {
    super();
    this.node = this.build(prop);
  }
  build(prop: ILogo): HTMLElement {
    const input = this.appendElem(
      {
        div: {
          class: 'w-full max-w-md space-y-4',
        },
      },
      {
        img: {
          class: 'mx-auto h-32 w-auto',
          src: './logo.png',
          alt: 'Your Company',
        },
        h2: {
          class: 'mt-6 text-center text-3xl font-bold tracking-tight text-gray-900',
          textContent: prop.text,
        },
      },
    );

    return input;
  }
}
