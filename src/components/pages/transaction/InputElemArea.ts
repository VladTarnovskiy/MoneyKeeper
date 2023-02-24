import { BaseComponent } from '../../base/baseComponent';

interface IInputElemArea {
  title: string;
  type: string;
  value: string;
}

export class InputElemArea extends BaseComponent {
  node: HTMLElement;

  constructor(prop: IInputElemArea) {
    super();
    this.node = this.build(prop);
  }
  build(prop: IInputElemArea): HTMLElement {
    const input = this.createElem(
      'div',
      `relative h-8 w-full  min-w-[100px] max-w-auto mt-4 ${
        prop.type === 'textarea' ? 'col-span-4 h-20' : ''
      }`,
    );
    const inputLabel = this.createElem(
      'label',
      'w-fit h-min bg-white p-1 absolute dark:rounded-md dark:-top-4 dark:bg-gray-300/50 dark:pt-[1px] dark:font-semibold left-2 -top-3 flex h-full w-full text-[11px] leading-tight text-stone-500 transition-all',
      this.textTranslate('Transaction.Description'),
    );
    const select: HTMLTextAreaElement = this.createElem2(prop.type, {
      id: prop.title.toLowerCase(),
      cols: 10,
      rows: 20,
      wrap: 'soft',
      class:
        'eer h-full w-full rounded-[7px] dark:bg-gray-300 cursor-pointer border text-right border-blue-gray-200 bg-transparent font-sans text-1xl font-normal transition-all focus:border-2 focus:border-grey-500 focus:outline-0 disabled:border-0',
    }) as HTMLTextAreaElement;

    select.value = prop.value;

    input.append(select, inputLabel);

    return input;
  }
}
