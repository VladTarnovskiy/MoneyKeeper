import { BaseComponent } from '../base/baseComponent';
import { SideBar } from './sideBar';

export class Main extends BaseComponent {
  root: HTMLElement;
  container: HTMLElement;
  sideBar: SideBar;
  //   logo: Logo;
  //   totalCounter: TotalCounter;
  //   account: Account;
  //   value = '10000';
  //   currency = '$';

  constructor(root: HTMLElement) {
    super();
    this.root = root;
    this.container = this.createElem('main', ' container mx-auto flex');
    this.sideBar = new SideBar(this.container);
    // this.totalCounter = new TotalCounter(this.header, this.value, this.currency);
    // this.account = new Account(this.header);
    // this.render();
  }

  render() {
    this.root.appendChild(this.container);
  }
}
