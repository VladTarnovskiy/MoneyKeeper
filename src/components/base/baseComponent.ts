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
  createElem2(element: string, prop?: TElement): HTMLElement {
    const out = document.createElement(element);

    for (const key in prop) {
      key in out ? (out[key] = prop[key]) : out.setAttribute(key, prop[key]);
    }

    return out;
  }
}
