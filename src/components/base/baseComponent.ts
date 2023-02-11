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
  action?: string;
  method?: string;
  src?: string;
  alt?: string;
  onchange?: () => void;
  onclick?: (event: Event) => void;
  onsubmit?: (event: Event) => void;
  checked?: boolean;
  disabled?: boolean;
}

interface TComponent {
  div?: TElement;
  input?: TElement;
  label?: TElement;
  img?: TElement;
  h2?: TElement;
  button?: TElement;
  span?: TElement;
}

export class BaseComponent {
  createElem(element: string, classes: string | undefined, text?: string): HTMLElement {
    const out = document.createElement(element);

    if (classes !== undefined) {
      out.className = classes;
    }

    if (text !== undefined) {
      out.textContent = `${text}`;
    }

    return out;
  }

  createElem2(element: string, prop: TElement): HTMLElement {
    const out = document.createElement(element);

    Object.keys(prop).forEach((key) => {
      key in out ? (out[key] = prop[key]) : out.setAttribute(key, prop[key]);
    });

    return out;
  }

  appendElem(node: TComponent, prop: TComponent): HTMLElement {
    let root = this.createElem2('div', {});

    Object.keys(node).forEach((key) => {
      root = this.createElem2(key, node[key]);
    });

    if (Object.keys(prop).length > 0) {
      Object.keys(prop).forEach((key) => {
        root.append(this.createElem2(key, prop[key]));
      });
    }

    return root;
  }

  replace(elem: HTMLElement, node: HTMLElement): HTMLElement {
    elem.replaceWith(node);

    return node;
  }
}
