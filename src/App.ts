import { Router } from '@/utils/router';

import { Model } from '@/components/model/model';
import { View } from '@/components/view';

import { Controller } from './utils/controller';

export class App {
  controller: Controller;

  constructor() {
    const model = new Model();
    const view = new View({
      onlogin: model.loginUser.bind(model),
      onregistration: model.registerUser.bind(model),
      onsetting: model.setSettings.bind(model),
      ongetuser: model.getUser.bind(model),
    });
    const router = new Router({
      onupdate: view.main.updateMain.bind(view.main),
    });

    this.controller = new Controller(model, view, router);
  }

  init(): void {
    this.controller.view.render();
    this.controller.addQueryListener();
    this.controller.checkRestartPage();
  }
}
