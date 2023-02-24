import { BaseComponent } from '../../base/baseComponent';

interface IPropInputText {
  title: string;
  value: string;
  disabled: boolean;
}

export class InputColorItem extends BaseComponent {
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
      sidebar: string;
    } = {
      name: this.textTranslate('Settings.Name'),
      language: this.textTranslate('Settings.Language'),
      theme: this.textTranslate('Settings.Themes'),
      sidebar: this.textTranslate('Settings.Sidebar'),
    };
    const inputItemContainer = this.createElem('div', 'p-2 flex justify-between');
    const inputItemTitle = this.createElem2('div', {
      class: 'title__name text-base mb-2 mr-4 font-light min-w-[120px] sm:hidden',
      textContent: `${String(tmp[prop.title])}:`,
    });

    const inputTextName = this.createElem2('input', {
      class:
        'input__name w-60 border text-right rounded h-10 border-[1px] dark:bg-gray-300 cursor-pointer',
      type: 'color',
      placeholder: '',
      value: prop.value,
      disabled: prop.disabled,
      id: prop.title.toLowerCase(),
    }) as HTMLInputElement;

    inputTextName.addEventListener('input', () => {
      const sideBar = document.querySelector<HTMLElement>('.sidebar');

      if (sideBar !== null) {
        sideBar.style.backgroundColor = inputTextName.value;
      }
    });

    inputItemContainer.append(inputItemTitle, inputTextName);

    return inputItemContainer;
  }
}
