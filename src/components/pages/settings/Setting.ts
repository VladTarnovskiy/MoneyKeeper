import i18next from 'i18next';

import { BaseComponent } from '@/components/base/baseComponent';
import type { Model } from '@/components/model/model';
import type { ISetting, ISettingReq, IUserDataReq } from '@/components/model/types';
import { Button } from '@/components/pages/authorization/Button';
import { InputColorItem } from '@/components/pages/settings/InputColorItem';
import { SettingItem } from '@/components/pages/settings/InputRadioItem';
import { InputTextItem } from '@/components/pages/settings/InputTextItem';
import { PopupDelete } from '@/components/pages/settings/PopupDelete';

interface IStateSetting {
  status: string;
  settingBlock: boolean;
  deleteBlock: boolean;
  message: string;
  setting: ISettingReq[];
  set: ISettingReq;
  sideBar: string;
}

export class Settings extends BaseComponent {
  node: HTMLElement;
  #state: IStateSetting;
  model: Model;
  updateView: () => void = () => {
    return;
  };

  constructor(model: Model) {
    super();
    this.model = model;
    this.#state = {
      status: '200',
      settingBlock: true,
      deleteBlock: true,
      message: '',
      setting: model.setting,
      set: {
        name: '',
        lang: 'EN',
        theme: 'Light',
        currency: 'EUR',
        userId: 0,
        id: 0,
      },
      sideBar: '',
    };

    this.readSetting();

    this.node = this.build();
  }

  readSetting(): void {
    if (this.model.setting[0] !== undefined) {
      this.#state.set = this.model.setting[0];
    }
  }

  async getSetting(): Promise<void> {
    const resp = await this.model.getUser<IUserDataReq>();

    resp !== undefined && resp.status === 200 && (await this.model.getSettings());
  }

  set state(state: IStateSetting) {
    this.#state = state;
  }

  get state(): IStateSetting {
    return this.#state;
  }

  build(): HTMLElement {
    const container = this.createElem('div', 'content__container flex flex-col');
    const pageTitle = this.createElem(
      'div',
      'page__title ml-2 text-3xl text-sky-600 dark:font-semibold dark:text-sky-900 dark:bg-gray-400 mb-4 bg-sky-100 rounded pl-2',
      this.textTranslate('Settings.Title'),
    );
    const pageContent = this.createElem('form', 'flex flex-col mt-4 border rounded');

    pageContent.onsubmit = this.onSubmit;

    const inputText = new InputTextItem({
      title: 'name',
      value: this.state.set.name,
      disabled: false,
    }).node;

    const inputLang = new SettingItem({
      title: 'language',
      options: ['EN', 'RU'],
      value: this.state.set.lang,
      disabled: false,
    }).node;
    const inputTheme = new SettingItem({
      title: 'theme',
      options: ['Light', 'Dark'],
      value: this.state.set.theme,
      disabled: false,
    }).node;
    const inputCurrency = new SettingItem({
      title: 'currency',
      options: ['USD', 'EUR', 'RUB', 'YEN'],
      value: this.state.set.currency,
      disabled: false,
    }).node;
    const inputSidebar = new InputColorItem({
      title: 'sidebar',
      value: '#38bdf8',
      disabled: false,
    }).node;

    inputTheme.addEventListener('click', (e) => {
      const { target } = e;
      const elem = target as HTMLInputElement;

      if (elem.name === 'theme') {
        this.state.set.theme = elem.defaultValue;
        document.body.className = elem.defaultValue.toLowerCase();
      }
    });

    inputCurrency.addEventListener('click', (e) => {
      const { target } = e;
      const elem = target as HTMLInputElement;

      if (elem.name === 'currency') {
        this.state.set.currency = elem.defaultValue;
        this.model.setCurrency(elem.defaultValue);
        this.updateView();
      }
    });

    inputLang.addEventListener('click', this.eventLang);
    const container1 = this.createElem('div', 'content__container flex flex-col gap-4');
    const message = this.createElem2('div', {
      class: `h-6 mx-auto text-center ${
        this.state.status === '200'
          ? 'text-green-500 dark:text-sky-700'
          : 'text-red-500 dark:text-red-700'
      }`,
      textContent: this.state.message,
    });

    const inputButton = new Button({
      text: 'saveSettings',
      disabled: false,
      onClick: () => {
        return;
      },
    }).node;

    const container2 = this.createElem(
      'div',
      'content__container flex flex-col  mt-4 ml-2 justify-end gap-4 border rounded',
    );

    const title = this.createElem(
      'div',
      'page__title mx-auto mb-auto text-2xl text-sky-600 dark:text-stone-700 mb-5',
      this.textTranslate('Settings.Check2'),
    );
    const inputButton2 = new Button({
      text: 'delete',
      type: 'button',
      disabled: false,
      onClick: this.onClick,
    }).node;

    container2.append(title, inputButton2);

    const container3 = this.createElem('div', 'flex flex-raw gap-4 md:flex-col');

    container1.append(inputButton);
    pageContent.append(inputText, inputLang, inputTheme, inputSidebar, inputCurrency, container1);
    container3.append(pageContent, container2);
    container.append(pageTitle, message, container3);

    return container;
  }

  eventLang = (e: Event): void => {
    const { target } = e;
    const elem = target as HTMLInputElement;

    if (elem.name === 'language') {
      const lang = elem.defaultValue;

      this.state.set.lang = lang;

      i18next.changeLanguage(lang.toLowerCase()).catch((err: string) => new Error(err));
      this.updateView();
    }
  };

  onClick = (): void => {
    const popup = new PopupDelete(this.model);

    popup.setCallback(this.update.bind(this));

    document.body.append(popup.node);
  };

  onSubmit = async (event: Event): Promise<void> => {
    event.preventDefault();
    const target = event.target as HTMLFormElement;

    const formElement = target.elements;

    const set: ISetting = {
      name: '',
      lang: 'EN',
      theme: 'Light',
      currency: 'EUR',
      userId: this.model.setting[0]?.userId ?? 0,
    };

    for (const iterator of formElement) {
      const element: HTMLFormElement = iterator as HTMLFormElement;

      if (element.type === 'radio') {
        if (element.id === 'language' && element.checked === true) {
          set.lang = String(element.value);
        }

        if (element.id === 'theme' && element.checked === true) {
          set.theme = String(element.value);
        }

        if (element.id === 'currency' && element.checked === true) {
          set.currency = String(element.value);
        }
      }

      if (element.type === 'text') {
        set.name = String(element.value);
      }
    }

    await this.updateSetting(set);
  };

  async updateSetting(set: ISetting): Promise<void> {
    const resp = await this.model.updateSettings<ISettingReq>(set, this.model.setting[0]?.id ?? 0);

    if (resp.status === 201 || resp.status === 200) {
      this.state.message = this.textTranslate('Settings.Message4');
      this.state.status = '200';
      this.state.settingBlock = true;
      this.model.setting[0]?.lang === 'EN'
        ? i18next.changeLanguage('en').catch((err: string) => new Error(err))
        : i18next.changeLanguage('ru').catch((err: string) => new Error(err));

      if (this.model.setting[0] !== undefined) {
        this.model.setCurrency(this.model.setting[0].currency);
      }
    } else {
      this.state.message = this.textTranslate('Settings.Message5');
      this.state.status = '400';
    }

    this.update();
  }

  update(): void {
    if (this.model.setting[0] !== undefined) {
      this.#state.set = this.model.setting[0];
    }

    const container = this.build();

    this.node.replaceWith(container);

    this.node = container;
  }
}
