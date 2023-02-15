import { BaseComponent } from '../../base/baseComponent';

export class SettingItem extends BaseComponent {
  root: HTMLElement;
  options: string[];
  title: string;

  constructor(root: HTMLElement, title: string, options: string[]) {
    super();
    this.root = root;
    this.title = title;
    this.options = options;
    this.render();
  }

  render(): void {
    const settingItemContainer = this.createElem('div', 'p-2 flex items-center');
    const settingItemTitle = this.createElem2('div', {
      class: 'title__name text-base mb-2 mr-4 font-light min-w-[120px] sm:hidden',
      textContent: `${this.title}:`,
    });

    settingItemContainer.append(settingItemTitle);

    this.options.forEach((item, index) => {
      const option = this.createElem2('input', {
        class: 'option__item ml-2 w-5 h-5 hover:cursor-pointer',
        type: 'radio',
        id: item,
        name: this.title,
      });

      if (index === 0) {
        option.setAttribute('checked', 'checked');
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
    this.root.appendChild(settingItemContainer);
  }
}
