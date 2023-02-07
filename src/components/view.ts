// import { Controller } from '../utils/controller';
import { BaseComponent } from './base/baseComponent';
import { Footer } from './footer/footer';
import { Header } from './header/header';
import { Main } from './main/main';

export class View extends BaseComponent {
  root: HTMLElement;
  header: Header;
  main: Main;
  footer: Footer;
  // controller: Controller;

  constructor() {
    super();
    // this.controller = controller;
    this.root = document.body;
    this.header = new Header(this.root);
    this.main = new Main(this.root);
    this.footer = new Footer(this.root);
  }

  render(): void {
    this.header.render();
    this.main.render();
    this.footer.render();
  }
}
