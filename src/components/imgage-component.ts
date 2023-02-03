export class Image {
  node: HTMLImageElement;
  constructor(parent: HTMLElement, className: string, src: string) {
    this.node = document.createElement('img');
    this.node.className = className;
    this.node.setAttribute('src', src);
    parent.appendChild(this.node);
    this.render();
  }
  render() {
    return this.node;
  }
}
