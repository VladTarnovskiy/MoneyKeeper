import { BaseComponent } from '@/components/base/baseComponent';
import { CalendarFooter } from '@/components/pages/calendar/calendarFooter';
import { CalendarHeader } from '@/components/pages/calendar/calendarHeader';
import { CalendarMain } from '@/components/pages/calendar/calendarMain';

export class Calendar extends BaseComponent {
  root: HTMLElement;
  calendarContainer: HTMLElement;
  pageCalendarTitle: HTMLElement;
  pageCalendarContent: HTMLElement;
  calendarHeaderContainer: HTMLElement;
  calendarFooterContainer: HTMLElement;
  calendarMainContainer: HTMLElement;
  calendarHeader: CalendarHeader;
  calendarMain: CalendarMain;
  calendarFooter: CalendarFooter;

  constructor(root: HTMLElement) {
    super();
    this.root = root;
    this.calendarContainer = this.createElem('div', 'content__calendar_container flex flex-col');
    this.pageCalendarTitle = this.createElem(
      'div',
      'page__title ml-2 text-3xl text-sky-600 mb-5',
      'Calendar',
    );
    this.pageCalendarContent = this.createElem('div', 'page__calendar_content gap-2 flex flex-col');
    this.calendarHeaderContainer = this.createElem(
      'div',
      'calendar__header_container flex flex-row xs:flex-col border-2 p-2 basis-1/2',
    );
    this.calendarMainContainer = this.createElem(
      'div',
      'calendar__main_container border-2 p-2 basis-1/2',
    );
    this.calendarFooterContainer = this.createElem(
      'div',
      'calendar__footer_container border-2 p-2 basis-1/2 flex justify-end',
    );
    this.pageCalendarContent.append(
      this.calendarHeaderContainer,
      this.calendarMainContainer,
      this.calendarFooterContainer,
    );
    this.calendarContainer.append(this.pageCalendarTitle, this.pageCalendarContent);
    this.calendarFooter = new CalendarFooter(this.calendarFooterContainer);
    this.calendarHeader = new CalendarHeader(this.calendarHeaderContainer);
    this.calendarMain = new CalendarMain(this.calendarMainContainer);
    this.render();
  }

  render(): void {
    this.root.appendChild(this.calendarContainer);
  }
}
