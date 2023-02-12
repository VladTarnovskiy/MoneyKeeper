import { TransactionStatisticItem } from '@/components/base/statisticItem';

export class ReportStatisticItem extends TransactionStatisticItem {
  constructor(
    root: HTMLElement,
    color: string,
    title: string,
    width: string,
    value: string,
    textColor?: string,
  ) {
    super(root, color, title, width, value, textColor);
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
}
