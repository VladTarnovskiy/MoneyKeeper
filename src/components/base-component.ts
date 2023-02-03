export class Component {
  node: HTMLElement;
  constructor(parent: HTMLElement, className: string) {
    this.node = document.createElement('div');
    this.node.className = className;
    parent.appendChild(this.node);
    this.render();
  }
  render() {
    return this.node;
  }
}
