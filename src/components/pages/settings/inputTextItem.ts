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
      Name: string;
      Language: string;
      Theme: string;
      Currency: string;
    } = {
      Name: this.textTranslate('Settings.Name'),
      Language: this.textTranslate('Settings.Language'),
      Theme: this.textTranslate('Settings.Themes'),
      Currency: this.textTranslate('Settings.Currency'),
    };
    const inputItemContainer = this.createElem('div', 'p-2 flex justify-between');
    const inputItemTitle = this.createElem2('div', {
      class: 'title__name text-base mb-2 mr-4 font-light min-w-[120px] sm:hidden',
      textContent: `${String(tmp[prop.title])}:`,
    });

    const inputTextName = this.createElem2('input', {
      class: 'input__name pl-2 w-60 border text-right rounded h-10 border-[1px]',
      type: 'text',
      placeholder: 'Enter username',
      value: prop.value,
      disabled: prop.disabled,
      id: prop.title.toLowerCase(),
    });

    inputItemContainer.append(inputItemTitle, inputTextName);

    return inputItemContainer;
  }
}
