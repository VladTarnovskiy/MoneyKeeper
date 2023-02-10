import { BaseComponent } from '../../base/baseComponent';

export class InputSelect extends BaseComponent {
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
    const filterContainer = this.createElem(
      'div',
      'relative h-8 w-full  min-w-[100px] max-w-[200px]',
    );
    const filterSelect = this.createElem(
      'select',
      'peer h-full w-full rounded-[7px] cursor-pointer border border-blue-gray-200 bg-transparent font-sans text-sm font-normal transition-all focus:border-2 focus:border-pink-500 focus:outline-0 disabled:border-0',
    );

    this.options.forEach((item) => {
      const option = this.createElem('option', 'option__item', item);

      option.setAttribute('value', item);

      filterSelect.append(option);
    });

    const inputLabel = this.createElem(
      'label',
      'w-fit h-min bg-white p-1 absolute left-2 -top-3 flex h-full w-full text-[11px] leading-tight text-stone-500 transition-all',
      this.title,
    );

    filterContainer.append(filterSelect, inputLabel);
    this.root.appendChild(filterContainer);
  }
}
