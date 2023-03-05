import { BaseComponent } from './baseComponent';

interface TElement {
  id?: string;
  name?: string;
  placeholder?: string;
  required?: string;
  autocomplete?: string;
  type?: string;
  class?: string;
  text?: string;
  for?: string;
  textContent?: string;
  innerHtml?: string;
  src?: string;
  alt?: string;
}

interface TComponent {
  div?: TElement;
  input?: TElement;
  label?: TElement;
  img?: TElement;
  h2?: TElement;
}

export class DivAppendComponent extends BaseComponent {
  root: HTMLElement;
  container: HTMLElement;

  constructor(root: HTMLElement, prop: TComponent) {
    super();
    this.root = root;
    this.container = this.createElem2('div', {});

    if (Object.keys(prop).length > 0) {
      Object.keys(prop).forEach((key) => {
        this.container.append(this.createElem2(key, prop[key]));
      });
    }

    this.render();
  }

  render(): void {
    this.root.appendChild(this.container);
  }
}
