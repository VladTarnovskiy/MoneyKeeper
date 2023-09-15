import { BaseComponent } from '../base/baseComponent';
import './loader.pcss';

export class Loader extends BaseComponent {
  root: HTMLElement;
  container: HTMLElement;

  constructor(root: HTMLElement) {
    super();
    this.root = root;
    this.container = this.createElem('div', 'loader');
  }

  loadPages(): void {
    this.render();
    window.addEventListener('DOMContentLoaded', () => {
      this.container.style.display = 'block';
    });

    window.addEventListener('load', () => {
      setTimeout(() => {
        this.container.style.display = 'none';
      }, 500);
    });
  }

  render(): void {
    this.container.style.display = 'block';
    const containerDemo = this.createElem('div', 'demo');

    for (let i = 0; i <= 4; i += 1) {
      const circle = this.createElem('div', 'circle');
      const circleInner = this.createElem('div', 'inner');

      circle.append(circleInner);
      containerDemo.append(circle);
    }

    this.container.appendChild(containerDemo);
    this.root.appendChild(this.container);
  }

  remove(): void {
    this.container.remove();
  }
}
