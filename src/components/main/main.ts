import { BaseComponent } from '../base/baseComponent';
import { Overview } from '../pages/overview/overview';

import { SideBar } from './sideBar';

export class Main extends BaseComponent {
  root: HTMLElement;
  container: HTMLElement;
  sideBar: SideBar;
  content: HTMLElement;
  overview: Overview;

  constructor(root: HTMLElement) {
    super();
    this.root = root;
    this.container = this.createElem('main', ' container mx-auto flex');
    this.content = this.createElem('section', 'content w-full border-t-2 border-l-2 p-3');
    this.sideBar = new SideBar(this.container);
    this.overview = new Overview(this.content);
    this.container.appendChild(this.content);
  }

  render(): void {
    this.root.appendChild(this.container);
  }
}
