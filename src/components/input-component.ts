export class Input {
  node: HTMLInputElement;
  constructor(parent: HTMLElement, className: string) {
    this.node = document.createElement('input');
    this.node.className = className;
    parent.appendChild(this.node);
    this.render();
  }
  render() {
    return this.node;
  }
}
