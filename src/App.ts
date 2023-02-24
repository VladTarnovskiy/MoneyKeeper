import i18next from 'i18next';

import type { IUserDataReq } from '@/components/model/types';

import { Controller } from './utils/controller';

export class App {
  controller: Controller;

  constructor() {
    this.controller = new Controller();
  }

  init(): void {
    this.initSetting().finally(() => {
      this.controller.model.setting[0]?.lang === 'EN'
        ? i18next.changeLanguage('en').catch((err: string) => new Error(err))
        : i18next.changeLanguage('ru').catch((err: string) => new Error(err));

      document.body.className = String(this.controller.model.setting[0]?.theme.toLowerCase());

      this.controller.view.render();
      this.controller.addQueryListener();
      this.controller.checkRestartPage();
    });
  }

  async initSetting(): Promise<void> {
    const resp = await this.controller.model.getUser<IUserDataReq>();

    resp !== undefined && resp.status === 200 && (await this.controller.model.getSettings());
  }
}
