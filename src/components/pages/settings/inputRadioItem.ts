import { BaseComponent } from '../../base/baseComponent';

interface IPropInput {
  title: string;
  options: string[];
  value: string;
  disabled: boolean;
}

export class SettingItem extends BaseComponent {
  node: HTMLElement;

  constructor(prop: IPropInput) {
    super();
    this.node = this.render(prop);
  }

  render(prop: IPropInput): HTMLElement {
    const tmp: {
      name: string;
      language: string;
      theme: string;
      currency: string;
    } = {
      name: this.textTranslate('Settings.Name'),
      language: this.textTranslate('Settings.Language'),
      theme: this.textTranslate('Settings.Themes'),
      currency: this.textTranslate('Settings.Currency'),
    };
    const settingItemContainer = this.createElem('div', 'p-2 flex justify-between');
    const settingItemTitle = this.createElem2('div', {
      class: 'title__name text-base mb-2 mr-4 font-light min-w-[120px] sm:hidden',
      textContent: `${String(tmp[prop.title])}:`,
    });

    settingItemContainer.append(settingItemTitle);

    prop.options.forEach((item, index) => {
      const option = this.createElem2('input', {
        class: 'option__item ml-2 w-5 h-5 hover:cursor-pointer',
        type: 'radio',
        id: prop.title.toLowerCase(),
        name: prop.title,
        checked: item === prop.value,
        disabled: prop.disabled,
      });

      if (index === 0) {
        // option.setAttribute('checked', 'checked');
      }

      option.setAttribute('value', item);

      const settingItemLabel = this.createElem2('label', {
        class: 'text-base mr-4 h-fit',
        textContent: `${item}`,
        for: item,
      });

      settingItemLabel.appendChild(option);

      settingItemContainer.append(settingItemLabel);
    });

    return settingItemContainer;
  }
}
