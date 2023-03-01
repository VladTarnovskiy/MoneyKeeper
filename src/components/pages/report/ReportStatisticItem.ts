import { BaseComponent } from '@/components/base/baseComponent';

export class ReportStatisticItem extends BaseComponent {
  root: HTMLElement;
  color: string;
  title: string;
  value: string;
  width: string;
  textColor: string;
  progressChecker: HTMLElement;
  widthValue: number;
  widthTitle: number;

  constructor(
    root: HTMLElement,
    color: string,
    title: string,
    width: string,
    value: string,
    widthValue: number,
    widthTitle: number,
    textColor?: string,
  ) {
    super();

    this.root = root;
    this.color = color;
    this.title = title;
    this.width = width;
    this.value = value;
    this.widthValue = widthValue;
    this.widthTitle = widthTitle;
    this.progressChecker = this.createElem(
      'div',
      'graph__item_checker dark:text-sky-900 h-4 relative',
    );

    if (textColor === undefined) {
      this.textColor = 'stone-600';
    } else {
      this.textColor = textColor;
    }

    this.render();

    this.addPercentValue();
  }
  addPercentValue(): void {
    const progressCheckerValue = this.createElem(
      'div',
      'absolute -right-[3px] top-[-5px] translate-x-[100%] graph__item_checker h-4',
      `${this.width}%`,
    );

    this.progressChecker.appendChild(progressCheckerValue);
  }
  render(): void {
    const graphItem = this.createElem(
      'div',
      `w-full ${this.textColor} items-center font-light flex gap-2`,
    );
    const graphItemTitle = this.createElem(
      'div',
      'graph__item_title dark:text-sky-900 min-w-16',
      `${this.title}:`,
    );

    graphItemTitle.style.width = `${this.widthTitle}px`;
    const graphItemProgress = this.createElem('div', 'graph__item_progress h-4 grow mr-5');

    this.progressChecker.style.width = `${this.width}%`;

    this.progressChecker.style.backgroundColor = this.color;
    graphItemProgress.appendChild(this.progressChecker);
    const graphItemSum = this.createElem(
      'div',
      'graphSum min-w-16 text-right dark:font-semibold',
      this.value,
    );

    graphItemSum.style.width = `${this.widthValue + 40}px`;

    graphItem.append(graphItemTitle, graphItemProgress, graphItemSum);
    this.root.appendChild(graphItem);
  }
}
