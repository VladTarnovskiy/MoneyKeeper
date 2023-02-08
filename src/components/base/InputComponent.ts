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
  innerHTML?: string;
}

interface TComponent {
  div?: TElement;
  input?: TElement;
  label?: TElement;
}

export class InputComponent extends BaseComponent {
  root: HTMLElement;
  container: HTMLElement;

  constructor(root: HTMLElement, prop: TComponent) {
    super();
    this.root = root;
    this.container = this.createElem2('div');

    for (const key in prop) {
      this.container.append(this.createElem2(key, prop[key]));
    }

    this.render();
  }

  render(): void {
    this.root.appendChild(this.container);
  }
}
