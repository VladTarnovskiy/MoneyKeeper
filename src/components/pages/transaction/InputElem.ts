import { BaseComponent } from '../../base/baseComponent';

interface IInputElem {
  title: string;
  type: string;
  value: string;
}

export class InputElem extends BaseComponent {
  node: HTMLElement;

  constructor(prop: IInputElem) {
    super();
    this.node = this.build(prop);
  }
  build(prop: IInputElem): HTMLElement {
    const tmp: {
      amount: string;
      date: string;
      time: string;
      subcategory: string;
    } = {
      amount: this.textTranslate('Transaction.Amount'),
      date: this.textTranslate('Transaction.Date'),
      time: this.textTranslate('Transaction.Time'),
      subcategory: this.textTranslate('Transaction.SubCategory'),
    };
    const input = this.createElem(
      'div',
      `relative h-8 w-full  min-w-[100px] max-w-auto ${
        prop.type === 'textarea' ? 'col-span-4 h-20' : ''
      }`,
    );
    const inputLabel = this.createElem(
      'label',
      'w-fit h-min bg-white p-1 absolute left-2 -top-3 flex h-full w-full dark:rounded-md dark:-top-4 dark:bg-gray-300/50 dark:pt-[1px] dark:font-semibold text-[11px] leading-tight text-stone-500 transition-all',
      String(tmp[prop.title]),
    );
    const select = this.createElem2('input', {
      id: prop.title === 'amount' ? 'sum' : prop.title.toLowerCase(),
      required: prop.title !== 'subcategory',
      type: prop.type,
      value: prop.type === 'number' ? Number(prop.value) : prop.value,
      min: 0,
      class:
        'eer h-full w-full rounded-[7px] cursor-pointer border text-right border-blue-gray-200 dark:bg-gray-300 bg-transparent font-sans text-1xl font-normal transition-all focus:border-2 focus:border-grey-500 focus:outline-0 disabled:border-0',
    });

    input.append(select, inputLabel);

    return input;
  }
}
