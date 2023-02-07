import { BaseComponent } from '../../base/baseComponent';

export class SortItem extends BaseComponent {
  root: HTMLElement;

  constructor(root: HTMLElement) {
    super();
    this.root = root;
    this.render();
  }

  render(): void {
    const sortContainer = this.createElem('div', 'relative h-8 w-full min-w-[100px] max-w-[200px]');
    const sortSelect = this.createElem(
      'select',
      'peer h-full w-full rounded-[7px] border cursor-pointer border-blue-gray-200 bg-transparent font-sans text-sm font-normal transition-all focus:border-2 focus:border-pink-500 focus:outline-0 disabled:border-0',
    );
    const sortOptionOne = this.createElem('option', 'option__one', 'DateInc');

    sortOptionOne.setAttribute('value', 'dateInk');
    const sortOptionTwo = this.createElem('option', 'option__one', 'DateDec');

    sortOptionTwo.setAttribute('value', 'dateDec');
    const sortOptionThree = this.createElem('option', 'option__one', 'SumInc');

    sortOptionThree.setAttribute('value', 'SumInk');
    const sortOptionFour = this.createElem('option', 'option__one', 'SumDec');

    sortOptionFour.setAttribute('value', 'SumDec');
    sortSelect.append(sortOptionOne, sortOptionTwo, sortOptionThree, sortOptionFour);

    const sortLabel = this.createElem(
      'label',
      'w-fit h-min bg-white p-1 absolute left-2 -top-3 flex h-full w-full text-[11px] leading-tight text-stone-500 transition-all',
      'Sort by',
    );

    sortContainer.append(sortSelect, sortLabel);
    this.root.appendChild(sortContainer);
  }
}
