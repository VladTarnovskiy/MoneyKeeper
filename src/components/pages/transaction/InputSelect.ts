import { BaseComponent } from '../../base/baseComponent';

interface IInputSelect {
  title: string;
  options: string[];
  optionsLang: string[];
  onchange: (this: GlobalEventHandlers, event: Event) => void;
  value: string;
}

export class InputSelect extends BaseComponent {
  node: HTMLElement;

  constructor(prop: IInputSelect) {
    super();
    this.node = this.build(prop);
  }
  build(prop: IInputSelect): HTMLElement {
    const input = this.createElem('div', 'relative h-8 w-full  min-w-[100px] max-w-auto');
    const inputLabel = this.createElem(
      'label',
      'w-fit h-min bg-white p-1 absolute left-2 -top-3 flex h-full w-full dark:rounded-md dark:-top-4 dark:bg-gray-300/50 dark:pt-[1px] dark:font-semibold text-[11px] leading-tight text-stone-500 transition-all dark:bg-gray-300',
      prop.title === 'Type notes'
        ? this.textTranslate('Transaction.TypeNotes')
        : this.textTranslate('Transaction.Category'),
    );
    const select = this.createElem2('select', {
      id: prop.title === 'Type notes' ? 'type' : prop.title.toLowerCase(),
      onchange: prop.onchange,
      class:
        'eer h-full w-full rounded-[7px] dark:bg-gray-300 cursor-pointer border border-blue-gray-200 bg-transparent font-sans text-1xl font-normal transition-all focus:border-2 focus:border-grey-500 focus:outline-0 disabled:border-0',
    });

    prop.options.forEach((option, index) => {
      select.append(
        this.createElem2('option', {
          value: option,
          textContent: prop.optionsLang[index] ?? '',
          selected: option === prop.value,
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
