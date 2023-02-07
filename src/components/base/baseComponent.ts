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
}
