export class Button {
  node: HTMLButtonElement;
  constructor(parent: HTMLElement, className: string) {
    this.node = document.createElement('button');
    this.node.className = className;
    parent.appendChild(this.node);
    this.render();
  }
  render() {
    return this.node;
  }
}
