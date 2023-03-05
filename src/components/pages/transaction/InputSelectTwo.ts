import type { SelectOptions } from '@/components/types/types';

import { BaseComponent } from '../../base/baseComponent';

interface IInputSelect {
  title: string;
  options: SelectOptions[];
  onchange: (this: GlobalEventHandlers, event: Event) => void;
  value: string;
}

export class InputSelectTwo extends BaseComponent {
  node: HTMLElement;

  constructor(prop: IInputSelect) {
    super();
    this.node = this.build(prop);
  }
  build(prop: IInputSelect): HTMLElement {
    const input = this.createElem('div', 'relative h-8 w-full  min-w-[100px] max-w-auto');
    const inputLabel = this.createElem(
      'label',
      'w-fit h-min bg-white p-1 absolute left-2 -top-3 flex h-full w-full text-[11px] leading-tight text-stone-500 transition-all',
      prop.title === 'Type notes'
        ? this.textTranslate('Transaction.TypeNotes')
        : this.textTranslate('Transaction.Category'),
    );
    const select = this.createElem2('select', {
      id: prop.title === 'Type notes' ? 'type' : prop.title.toLowerCase(),
      onchange: prop.onchange,
      class:
        'eer h-full w-full rounded-[7px] cursor-pointer border border-blue-gray-200 bg-transparent font-sans text-1xl font-normal transition-all focus:border-2 focus:border-grey-500 focus:outline-0 disabled:border-0',
    });

    prop.options.forEach((option) => {
      select.append(
        this.createElem2('option', {
          value: option.value,
          textContent: option.option,
          selected: option.value === prop.value,
        }),
      );
    });

    input.append(select, inputLabel);

    return input;
  }
}

// {
//     option: {
//       value: 'email-address',
//       textContent: 'email',
//       class: 'option__item',
//     },
//     option: {
//         value: 'email-address',
//         textContent: 'email',
//         class: 'option__item',
//       },
//   },
