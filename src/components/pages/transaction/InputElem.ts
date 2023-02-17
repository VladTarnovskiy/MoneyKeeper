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
    const input = this.createElem(
      'div',
      `relative h-8 w-full  min-w-[100px] max-w-auto ${
        prop.type === 'textarea' ? 'col-span-4 h-20' : ''
      }`,
    );
    const inputLabel = this.createElem(
      'label',
      'w-fit h-min bg-white p-1 absolute left-2 -top-3 flex h-full w-full text-[11px] leading-tight text-stone-500 transition-all',
      prop.title,
    );
    const select = this.createElem2('input', {
      id: prop.title === 'Amount' ? 'sum' : prop.title.toLowerCase(),
      required: prop.title !== 'Subcategory',
      type: prop.type,
      value: prop.type === 'number' ? Number(prop.value) : prop.value,
      min: 0,
      class:
        'eer h-full w-full rounded-[7px] cursor-pointer border text-right border-blue-gray-200 bg-transparent font-sans text-1xl font-normal transition-all focus:border-2 focus:border-grey-500 focus:outline-0 disabled:border-0',
    });

    input.append(select, inputLabel);

    return input;
  }
}
