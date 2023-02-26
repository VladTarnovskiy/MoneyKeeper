import { BaseComponent } from '@/components/base/baseComponent';
import type { SelectOptions } from '@/components/types/types';

export class InputSelect extends BaseComponent {
  root: HTMLElement;
  options: SelectOptions[];
  title: string;
  filterSelect: HTMLInputElement;
  prop: (way: string) => void;
  storageLabel: string;

  constructor(
    root: HTMLElement,
    title: string,
    options: SelectOptions[],
    prop: (way: string) => void,
    storageLabel: string,
  ) {
    super();
    this.root = root;
    this.title = title;
    this.prop = prop;

    this.options = options;
    this.storageLabel = storageLabel;
    this.filterSelect = this.createElem(
      'select',
      'peer h-full w-full rounded-[7px] cursor-pointer border border-blue-gray-200 dark:bg-gray-300 bg-transparent font-sans text-sm font-normal transition-all focus:border-2 focus:border-pink-500 focus:outline-0 disabled:border-0',
    );
    this.render();
  }

  render(): void {
    const filterContainer = this.createElem(
      'div',
      'relative h-8 w-full min-w-[100px] max-w-[200px]',
    );

    this.options.forEach((item, index) => {
      const option = this.createElem('option', 'option__item', item.option);

      if (index === 0) {
        option.setAttribute('checked', 'checked');
        option.setAttribute('disabled', 'disabled');
      }

      option.setAttribute('value', item.value);

      this.filterSelect.append(option);
    });
    const storageTransactionSelectType = localStorage.getItem(`${this.storageLabel}`);

    if (storageTransactionSelectType !== null) {
      this.filterSelect.value = storageTransactionSelectType;
    }

    const inputLabel = this.createElem(
      'label',
      'w-fit h-min dark:rounded-md dark:font-semibold bg-white p-1 absolute left-2 -top-3 dark:-top-4 dark:bg-gray-300/50 dark:pt-[1px] flex h-full w-full text-[11px] leading-tight text-stone-500 transition-all',
      this.title,
    );

    this.filterSelect.addEventListener('change', () => {
      localStorage.setItem(this.storageLabel, `${this.filterSelect.value}`);
      this.prop(this.filterSelect.value);
    });

    filterContainer.append(this.filterSelect, inputLabel);
    this.root.appendChild(filterContainer);
  }
}
