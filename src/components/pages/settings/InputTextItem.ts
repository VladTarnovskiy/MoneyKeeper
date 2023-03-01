import { BaseComponent } from '../../base/baseComponent';

interface IPropInputText {
  title: string;
  value: string;
  disabled: boolean;
}

export class InputTextItem extends BaseComponent {
  node: HTMLElement;

  constructor(prop: IPropInputText) {
    super();
    this.node = this.render(prop);
  }

  render(prop: IPropInputText): HTMLElement {
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
    const inputItemContainer = this.createElem('div', 'p-2 flex justify-between');
    const inputItemTitle = this.createElem2('div', {
      class: 'title__name text-base mb-2 mr-4 font-light min-w-[120px] sm:hidden',
      textContent: `${String(tmp[prop.title])}:`,
    });

    const inputTextName = this.createElem2('input', {
      class:
        'input__name pl-2 pr-2 w-60 border text-right rounded h-10 border-[1px] dark:bg-gray-300',
      type: 'text',
      placeholder: 'Enter username',
      value: prop.value,
      name: prop.title.toLowerCase(),
      disabled: prop.disabled,
      id: prop.title.toLowerCase(),
    });

    inputItemContainer.append(inputItemTitle, inputTextName);

    return inputItemContainer;
  }
}
