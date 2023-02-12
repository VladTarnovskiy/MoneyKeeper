import { CalendarMonthProgress } from '@/components/pages/calendar/calendarMonthProgress';

import { BaseComponent } from '../../base/baseComponent';

import { monthArrayEng } from './calendarMonthData';

export class CalendarMain extends BaseComponent {
  root: HTMLElement;
  mainMonthContainer: HTMLElement;

  constructor(root: HTMLElement) {
    super();
    this.root = root;
    this.mainMonthContainer = this.createElem(
      'div',
      'mainMonth__container grid grid-cols-4 xs:grid-cols-1 md:grid-cols-2 gap-1 w-full h=w',
    );
    this.createMonth();
    this.render();
  }

  createMonth(): void {
    const monthArrayHtmlelements: HTMLElement[] = [];

    monthArrayEng.forEach((a) => {
      const month = this.createElem(
        'div',
        `mainMonth__${a} flex flex-col place-content-around h-48 border-2 p-3`,
      );

      monthArrayHtmlelements.push(month);
      new CalendarMonthProgress(month, a);
    });
    this.mainMonthContainer.append(...monthArrayHtmlelements);
  }

  render(): void {
    this.root.append(this.mainMonthContainer);
  }
}
