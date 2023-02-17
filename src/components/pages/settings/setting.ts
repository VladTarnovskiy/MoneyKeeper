import { BaseComponent } from '@/components/base/baseComponent';
import type { Model } from '@/components/model/model';
import type { ISetting, ISettingReq } from '@/components/model/types';
import { Button } from '@/components/pages/authorization/Button';
import { InputCheck } from '@/components/pages/authorization/InputCheck';
import { SettingItem } from '@/components/pages/settings/inputRadioItem';
import { InputTextItem } from '@/components/pages/settings/inputTextItem';
// import { InputElem } from '@/components/pages/transaction/InputElem';

interface IStateSetting {
  status: string;
  settingBlock: boolean;
  deleteBlock: boolean;
  message: string;
  setting: ISettingReq[];
}

export class Settings extends BaseComponent {
  node: HTMLElement;
  #state: IStateSetting;
  model: Model;

  constructor(model: Model) {
    super();
    this.#state = {
      status: '200',
      settingBlock: true,
      deleteBlock: true,
      message: '',
      setting: model.setting,
    };
    this.model = model;
    this.node = this.build();
    this.update();
  }
  set state(state: IStateSetting) {
    this.#state = state;
    this.update();
  }

  get state(): IStateSetting {
    return this.#state;
  }

  build(): HTMLElement {
    const container = this.createElem('div', 'content__container flex flex-col');
    const pageTitle = this.createElem(
      'div',
      'page__title ml-2 text-3xl text-sky-600 mb-4 bg-sky-100 rounded pl-2',
      'Settings',
    );
    const pageContent = this.createElem('form', 'flex flex-col mt-4 border rounded');

    pageContent.onsubmit = this.onSubmit;

    const set: ISettingReq = this.model.setting[0] ?? {
      name: '',
      lang: 'EN',
      theme: 'Light',
      currency: 'EUR',
      userId: 0,
      id: 0,
    };

    const inputText = new InputTextItem({
      title: 'Name',
      value: set.name,
      disabled: this.state.settingBlock,
    }).node;
    const inputLang = new SettingItem({
      title: 'Language',
      options: ['EN', 'RU'],
      value: set.lang,
      disabled: this.state.settingBlock,
    }).node;
    const inputTheme = new SettingItem({
      title: 'Theme',
      options: ['Light', 'Dark'],
      value: set.theme,
      disabled: this.state.settingBlock,
    }).node;
    const inputCurrency = new SettingItem({
      title: 'Currency',
      options: ['USD', 'EUR', 'RUB', 'YEN'],
      value: set.currency,
      disabled: this.state.settingBlock,
    }).node;

    const container1 = this.createElem('div', 'content__container flex flex-col gap-4');
    const message = this.createElem2('div', {
      class: `h-6 mx-auto text-center text-${this.state.status === '200' ? 'green' : 'red'}-500`,
      textContent: this.state.message,
    });
    const inputCheck = new InputCheck({
      onclick: this.onCheck,
      checked: !this.state.settingBlock,
      disabled: false,
      label: 'change settings',
    }).node;
    const inputButton = new Button({
      text: 'Save settings',
      disabled: this.state.settingBlock,
      onClick: () => {
        return;
      },
    }).node;

    const container2 = this.createElem(
      'div',
      'content__container flex flex-col  mt-4 ml-2 justify-end gap-4 border rounded',
    );
    const inputCheck2 = new InputCheck({
      onclick: this.onCheckDel,
      checked: !this.state.deleteBlock,
      disabled: false,
      label: 'Delete account',
    }).node;
    const inputButton2 = new Button({
      text: 'Delete',
      type: 'button',
      disabled: this.state.deleteBlock,
      onClick: this.onClick,
    }).node;

    container2.append(inputCheck2, inputButton2);

    const container3 = this.createElem('div', 'flex flex-raw gap-4');

    container1.append(inputCheck, inputButton);
    pageContent.append(inputText, inputLang, inputTheme, inputCurrency, container1);
    container3.append(pageContent, container2);
    container.append(pageTitle, message, container3);

    return container;
  }
  onCheck = (): void => {
    this.state.settingBlock = !this.state.settingBlock;
    this.state.message = '';
    this.update();
  };

  onCheckDel = (): void => {
    this.state.deleteBlock = !this.state.deleteBlock;
    this.state.message = this.state.deleteBlock
      ? ''
      : 'Attention! You are permanently deleting your account!';
    this.state.status = this.state.deleteBlock ? '200' : '400';
    this.update();
  };

  onClick = (): void => {
    this.model
      .deleteAccount()
      .then((res) => {
        if (res.status === 200) {
          this.state.message = 'Your account deleting.';
          localStorage.userdata = '';
          setTimeout(() => {
            location.hash = '#signup';
          }, 2000);
        } else {
          this.state.message = 'Fault deleting. ';
        }

        this.update();
      })
      .catch((err: string) => {
        new Error(err);
      });
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
      this.state.message = 'Setting save';
      this.state.status = '200';
      this.state.settingBlock = true;
      this.update();
    } else {
      this.state.message = 'Setting save fault';
      this.state.status = '400';
      this.update();
    }
  }

  update(): void {
    const container = this.build();

    this.node.replaceWith(container);

    this.node = container;
  }
}
