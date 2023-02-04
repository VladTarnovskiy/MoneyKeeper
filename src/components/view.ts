import { BaseComponent } from '../components/base/baseComponent';
import { Header } from './header/header';
import { Main } from './main/main';
import { Footer } from './footer/footer';

export class View extends BaseComponent {
  root: HTMLElement;
  header: Header;
  main: Main;
  footer: Footer;

  constructor() {
    super();
    this.root = document.body;
    this.header = new Header(this.root);
    this.main = new Main(this.root);
    this.footer = new Footer(this.root);
  }

  render() {
    this.header.render();
    this.main.render();
    this.footer.render();
  }
}
