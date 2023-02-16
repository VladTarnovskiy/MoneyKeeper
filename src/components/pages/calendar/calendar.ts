import { BaseComponent } from '@/components/base/baseComponent';
import type { Model } from '@/components/model/model';
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
  model: Model;
  calendarHeader: CalendarHeader;
  calendarFooter: CalendarFooter;
  calendarMain: CalendarMain;
  yearInputElementVal: string;
  categoryInputElementVal: string;

  constructor(root: HTMLElement, model: Model) {
    super();
    this.root = root;
    this.model = model;
    this.yearInputElementVal = '2023';
    this.categoryInputElementVal = 'All';
    this.calendarContainer = this.createElem('div', 'content__calendar_container flex flex-col');
    this.pageCalendarTitle = this.createElem(
      'div',
      'page__title ml-2 text-3xl text-sky-600 mb-5 bg-sky-100 rounded pl-2',
      'Calendar',
    );
    this.pageCalendarContent = this.createElem('div', 'page__calendar_content gap-2 flex flex-col');
    this.calendarHeaderContainer = this.createElem(
      'div',
      'calendar__header_container flex flex-row xs:flex-col border-2 p-3 basis-1/2',
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
    this.calendarHeader = new CalendarHeader(this.calendarHeaderContainer, this.model.transaction);
    this.calendarMain = new CalendarMain(this.calendarMainContainer, this.model.transaction);
    this.calendarFooter = new CalendarFooter(
      this.calendarFooterContainer,
      this.model.transaction,
      '2023',
    );
    this.render();
  }

  render(): void {
    this.addListeners();
    this.root.appendChild(this.calendarContainer);
  }

  updateCalendar(): void {
    this.updateCalendarHeader();
    this.updateCalendarMain();
    this.calendarFooter.updateCalendarFooter(this.yearInputElementVal);
  }

  updateCalendarMain(): void {
    this.yearInputElementVal = this.calendarHeader.yearInputElement.value;
    this.categoryInputElementVal = this.calendarHeader.categoryInputElement.value;
    this.updateTransactionData();
    this.calendarMain.createMonth(this.categoryInputElementVal, this.yearInputElementVal);
  }

  updateCalendarHeader(): void {
    this.updateTransactionData();
    this.calendarHeader.createYearArr();
  }

  updateTransactionData(): void {
    this.calendarHeader.transactionData = this.model.transaction;
    this.calendarMain.transactionData = this.model.transaction;
    this.calendarFooter.transactionData = this.model.transaction;
  }

  addListeners(): void {
    this.calendarHeader.yearContainer.oninput = () => {
      this.updateCalendarMain();
      localStorage.setItem('calendarYear', this.calendarHeader.yearInputElement.value);
      this.calendarFooter.updateCalendarFooter(String(this.calendarHeader.yearInputElement.value));
    };

    this.calendarHeader.categoryInputElement.oninput = () => {
      this.updateCalendarMain();
    };
  }
}
