import { BaseComponent } from '../../base/baseComponent';
import '../report/statisticBlock';

export class TransactionStatisticItem extends BaseComponent {
  root: HTMLElement;
  color: string;
  title: string;
  value: string;
  width: string;
  textColor: string;

  constructor(
    root: HTMLElement,
    color: string,
    title: string,
    width: string,
    value: string,
    textColor?: string,
  ) {
    super();

    this.root = root;
    this.color = color;
    this.title = title;
    this.width = width;
    this.value = value;

    if (textColor === undefined) {
      this.textColor = 'stone-600';
    } else {
      this.textColor = textColor;
    }

    this.render();
  }
  render(): void {
    const graphItemOne = this.createElem(
      'div',
      `w-full items-center text-${this.textColor} font-light flex gap-2`,
    );
    const graphItemTitleOne = this.createElem('div', 'graph__item_title w-16', `${this.title}:`);
    const graphItemProgressOne = this.createElem('div', 'graph__item_progress h-4 grow');
    const progressOneChecker = this.createElem('div', 'graph__item_checker h-4');

    progressOneChecker.style.width = `${this.width}%`;

    progressOneChecker.style.backgroundColor = this.color;
    graphItemProgressOne.appendChild(progressOneChecker);
    const graphItemSumOne = this.createElem('div', 'graphSum w-16 text-right', `${this.value}`);

    graphItemOne.append(graphItemTitleOne, graphItemProgressOne, graphItemSumOne);
    this.root.appendChild(graphItemOne);
  }
}
