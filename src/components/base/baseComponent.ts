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
  action?: string;
  method?: string;
  src?: string;
  alt?: string;
  onchange?: () => void;
  onclick?: (this: GlobalEventHandlers, event: MouseEvent) => void;
  onsubmit?: (event: Event) => void;
  checked?: boolean;
  disabled?: boolean;
  value?: string;
  rows?: number;
  cols?: number;
  wrap?: string;
}

interface TComponent {
  div?: TElement;
  input?: TElement;
  label?: TElement;
  img?: TElement;
  h2?: TElement;
  button?: TElement;
  span?: TElement;
  select?: TElement;
  option?: TElement;
  textarea?: TElement;
}

import i18next from 'i18next';

export class BaseComponent {
  createElem<T extends HTMLElement>(
    element: string,
    classes: string | undefined,
    text?: string,
  ): T {
    const out = document.createElement(element) as T;

    if (classes !== undefined) {
      out.className = classes;
    }

    if (text !== undefined) {
      out.textContent = `${text}`;
    }

    return out;
  }

  createElem2<T extends TElement>(element: string, prop: T): HTMLElement {
    const out = document.createElement(element);

    Object.keys(prop).forEach((key) => {
      typeof prop[key] === 'string' && out.setAttribute(key, String(prop[key]));
      typeof prop[key] === 'number' && out.setAttribute(key, String(prop[key]));
      typeof prop[key] === 'boolean' && (out[key] = Boolean(prop[key]));
    });

    Object.keys(prop).forEach((key) => {
      key === 'onclick' && prop.onclick !== undefined && (out.onclick = prop.onclick);
      key === 'onchange' && prop.onchange !== undefined && (out.onchange = prop.onchange);
      key === 'onsubmit' && prop.onsubmit !== undefined && (out.onsubmit = prop.onsubmit);
      key === 'textContent' &&
        prop.textContent !== undefined &&
        (out.textContent = prop.textContent);
      key === 'innerHtml' && prop.innerHtml !== undefined && (out.innerHTML = prop.innerHtml);
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
  textTranslate(key: string): string {
    return i18next.t(key);
  }
}
