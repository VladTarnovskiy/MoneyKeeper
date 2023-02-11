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
  textTranslate(key: string): string {
    return i18next.t(key);
  }
}
