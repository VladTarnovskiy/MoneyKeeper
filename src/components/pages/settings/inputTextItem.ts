import { BaseComponent } from '../../base/baseComponent';

export class InputTextItem extends BaseComponent {
  root: HTMLElement;
  title: string;
  value: string;

  constructor(root: HTMLElement, title: string, value: string) {
    super();
    this.root = root;
    this.title = title;
    this.value = value;
    this.render();
  }

  render(): void {
    const inputItemContainer = this.createElem('div', 'p-2 flex items-center');
    const inputItemTitle = this.createElem2('div', {
      class: 'title__name text-base mb-2 mr-4 font-light min-w-[120px]',
      textContent: `${this.title}:`,
    });

    inputItemContainer.append(inputItemTitle);
    const inputTextName = this.createElem2('input', {
      class: 'input__name pl-2 w-60 border rounded h-10 border-[1px]',
      type: 'text',
      placeholder: 'Enter username',
    });

    inputItemContainer.append(inputItemTitle, inputTextName);
    // });
    this.root.appendChild(inputItemContainer);
  }
}
