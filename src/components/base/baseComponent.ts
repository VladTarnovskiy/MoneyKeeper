export class BaseComponent {
  createElem(element: string, classes: string, text?: string) {
    const out = document.createElement(element);
    out.className = `${classes}`;
    if (text) {
      out.textContent = `${text}`;
    }
    return out;
  }
}
