// type parent = HTMLElement extends Component
export class Component extends HTMLElement {
  node: HTMLElement;
  constructor(className: string, text?: string, parent?: HTMLElement | Component) {
    super();
    this.node = document.createElement('div');
    this.node.className = className;
    if (text) {
      this.node.textContent = text;
    }
    if (parent) {
      parent.appendChild(this.node);
    }
    this.render();
  }
  render() {
    return this.node;
  }
}
