import '@/styles/index.css';
import { Header } from './components/header';

class App {
  private root = document.getElementById('root');
  private header = new Header();
  constructor() {}

  render() {
    this.root?.appendChild(this.header);
  }
}

const app = new App();
app.render();
