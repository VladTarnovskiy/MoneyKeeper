import { BaseComponent } from '@/components/base/baseComponent';
import { SettingItem } from '@/components/pages/settings/inputRadioItem';
import { InputTextItem } from '@/components/pages/settings/inputTextItem';

export class Settings extends BaseComponent {
  root: HTMLElement;
  container: HTMLElement;
  pageTitle: HTMLElement;
  pageContent: HTMLElement;

  constructor(root: HTMLElement) {
    super();
    this.root = root;
    this.container = this.createElem('div', 'content__container flex flex-col');
    this.pageTitle = this.createElem(
      'div',
      'page__title ml-2 text-3xl text-sky-600 mb-5',
      'Settings',
    );
    this.pageContent = this.createElem('div', 'page__content flex flex-col');
    new SettingItem(this.pageContent, 'Language', ['EN', 'RU']);
    new SettingItem(this.pageContent, 'Theme', ['light', 'dark']);
    new SettingItem(this.pageContent, 'Currency', ['$', '€', '₽', '¥']);
    new InputTextItem(this.pageContent, 'Username', 'name');

    // this.pageContent.appendChild(inputName);

    this.container.append(this.pageTitle, this.pageContent);
    this.render();
  }

  render(): void {
    this.root.appendChild(this.container);
  }
}
