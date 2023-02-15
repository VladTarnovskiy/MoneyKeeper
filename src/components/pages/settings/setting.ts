import { BaseComponent } from '@/components/base/baseComponent';
import { Button } from '@/components/pages/authorization/Button';
import { InputCheck } from '@/components/pages/authorization/InputCheck';
import { SettingItem } from '@/components/pages/settings/inputRadioItem';
import { InputTextItem } from '@/components/pages/settings/inputTextItem';
// import { InputElem } from '@/components/pages/transaction/InputElem';

interface IStateSetting {
  status: string;
  inputCheck: boolean;
  message: string;
}

export class Settings extends BaseComponent {
  root: HTMLElement;
  container: HTMLElement;
  #state: IStateSetting;

  constructor(root: HTMLElement) {
    super();
    this.root = root;
    this.#state = {
      status: '200',
      inputCheck: false,
      message: '',
    };
    this.container = this.build();
    this.render();
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
    const pageContent = this.createElem('div', 'flex flex-col mt-4');

    new InputTextItem(pageContent, 'Username', 'name');
    new SettingItem(pageContent, 'Language', ['EN', 'RU']);
    new SettingItem(pageContent, 'Theme', ['Light', 'Dark']);
    new SettingItem(pageContent, 'Currency', ['$', '€', '₽', '¥']);

    const container1 = this.createElem('div', 'content__container flex flex-col gap-4');
    const message = this.createElem2('div', {
      class: `h-6 mx-auto text-center text-${this.state.status === '200' ? 'green' : 'red'}-500`,
      textContent: this.state.message,
    });
    const inputCheck = new InputCheck({
      onclick: () => {
        return;
      },
      checked: false,
      disabled: false,
    }).node;
    const inputButton = new Button({
      text: 'Save settings',
    }).node;

    container1.append(inputCheck, inputButton);
    pageContent.append(container1);
    container.append(pageTitle, message, pageContent);

    return container;
  }

  update(): void {
    const container = this.build();

    this.container.replaceWith(container);

    this.container = container;
  }

  render(): void {
    this.root.appendChild(this.container);
  }
}
