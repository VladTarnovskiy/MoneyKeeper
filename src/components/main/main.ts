import { BaseComponent } from '../base/baseComponent';
import { SideBar } from './sideBar';

export class Main extends BaseComponent {
  root: HTMLElement;
  container: HTMLElement;
  sideBar: SideBar;
  content: HTMLElement;

  constructor(root: HTMLElement) {
    super();
    this.root = root;
    this.container = this.createElem('main', ' container mx-auto flex');
    this.sideBar = new SideBar(this.container);
    this.content = this.createElem('section', 'content w-full border-t-2 border-l-2 p-3');
    this.container.appendChild(this.content);
  }

  render() {
    this.root.appendChild(this.container);
  }
}
