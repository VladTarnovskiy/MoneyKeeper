import { BaseComponent } from './baseComponent';

export class InputSelect extends BaseComponent {
  root: HTMLElement;
  options: string[];
  title: string;
  filterSelect: HTMLInputElement;
  // prop!: (way: string) => void;

  constructor(root: HTMLElement, title: string, options: string[]) {
    super();
    this.root = root;
    this.title = title;

    // if (prop === undefined) {
    // this.prop = prop;
    // }

    this.options = options;
    this.filterSelect = this.createElem(
      'select',
      'peer h-full w-full rounded-[7px] cursor-pointer border border-blue-gray-200 bg-transparent dark:bg-gray-300 font-sans text-sm font-normal transition-all focus:border-2 focus:border-pink-500 focus:outline-0 disabled:border-0',
    );
    this.render();
  }

  render(): void {
    const filterContainer = this.createElem(
      'div',
      'relative h-8 w-full  min-w-[100px] max-w-[200px]',
    );

    this.options.forEach((item) => {
      const option = this.createElem('option', 'option__item', item);

      option.setAttribute('value', item);
      this.filterSelect.append(option);
    });

    const inputLabel = this.createElem(
      'label',
      'w-fit h-min bg-white p-1 absolute left-2 -top-3 flex h-full w-full text-[11px] leading-tight dark:rounded-md text-stone-500 dark:-top-4 dark:bg-gray-300/50 dark:pt-[1px] dark:font-semibold transition-all',
      this.title,
    );

    // this.filterSelect.addEventListener('click', () => {
    //   this.prop(this.filterSelect.value);
    // });

    filterContainer.append(this.filterSelect, inputLabel);
    this.root.appendChild(filterContainer);
  }
}
