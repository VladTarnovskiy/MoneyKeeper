import { Controller } from './utils/controller';

export class App {
  controller: Controller;

  constructor() {
    this.controller = new Controller();
  }

  init(): void {
    this.controller.view.render();
    this.controller.addQueryListener();
    this.controller.checkRestartPage();
  }
}
