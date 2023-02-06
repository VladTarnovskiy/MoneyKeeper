import { BaseComponent } from '../../base/baseComponent';

export class FilterItem extends BaseComponent {
  root: HTMLElement;

  constructor(root: HTMLElement) {
    super();
    this.root = root;
    this.render();
  }

  render(): void {
    const filterContainer = this.createElem(
      'div',
      'relative h-8 w-full  min-w-[100px] max-w-[200px]',
    );
    const filterSelect = this.createElem(
      'select',
      'peer h-full w-full rounded-[7px] border border-blue-gray-200 bg-transparent font-sans text-sm font-normal transition-all focus:border-2 focus:border-pink-500 focus:outline-0 disabled:border-0',
    );
    const filterOptionOne = this.createElem('option', 'option__one', 'All');

    filterOptionOne.setAttribute('value', 'all');
    const filterOptionTwo = this.createElem('option', 'option__two', 'Expence');

    filterOptionTwo.setAttribute('value', 'expence');
    const filterOptionThree = this.createElem('option', 'option__three', 'Income');

    filterOptionThree.setAttribute('value', 'income');
    filterSelect.append(filterOptionOne, filterOptionTwo, filterOptionThree);

    const filterLabel = this.createElem(
      'label',
      'w-fit h-fit bg-white p-1 absolute left-2 -top-2.5 flex h-full w-full text-[11px] leading-tight text-stone-500 transition-all',
      'Filter by',
    );

    filterContainer.append(filterSelect, filterLabel);
    this.root.appendChild(filterContainer);
  }
}
