import { BaseComponent } from '../base/baseComponent';
import './loader.pcss';

export class Loader extends BaseComponent {
  root: HTMLElement;

  constructor(root: HTMLElement) {
    super();
    this.root = root;
    this.render();
  }

  render(): void {
    const container = this.createElem('div', 'loader');
    const containerDemo = this.createElem('div', 'demo');

    for (let i = 0; i <= 4; i += 1) {
      const circle = this.createElem('div', 'circle');
      const circleInner = this.createElem('div', 'inner');

      circle.append(circleInner);
      containerDemo.append(circle);
    }

    container.appendChild(containerDemo);

    window.addEventListener('DOMContentLoaded', () => {
      container.style.display = 'block';

      // setTimeout(() => {
      //   container.style.display = 'none';
      // }, 1000);
    });

    window.addEventListener('load', () => {
      // container.style.display = 'block';

      setTimeout(() => {
        container.style.display = 'none';
      }, 500);
    });

    this.root.appendChild(container);
  }
}
