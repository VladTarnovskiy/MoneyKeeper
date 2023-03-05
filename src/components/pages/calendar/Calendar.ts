import { BaseComponent } from '@/components/base/baseComponent';
import type { Model } from '@/components/model/model';
import { CalendarFooter } from '@/components/pages/calendar/CalendarFooter';
import { CalendarHeader } from '@/components/pages/calendar/CalendarHeader';
import { CalendarMain } from '@/components/pages/calendar/CalendarMain';

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
      'page__title ml-2 text-3xl dark:font-semibold dark:text-sky-900 dark:bg-gray-400 text-sky-600 mb-5 bg-sky-100 rounded pl-2',
      `${this.textTranslate('CalendarPage.Calendar')}`,
    );
    this.pageCalendarContent = this.createElem('div', 'page__calendar_content gap-2 flex flex-col');
    this.calendarHeaderContainer = this.createElem(
      'div',
      'calendar__header_container flex flex-row md:flex-col md:gap-y-3 gap-x-2 p-2 basis-1/2',
    );
    this.calendarMainContainer = this.createElem('div', 'calendar__main_container basis-1/2');
    this.calendarFooterContainer = this.createElem(
      'div',
      'calendar__footer_container basis-1/2 flex justify-end',
    );
    this.pageCalendarContent.append(
      this.calendarHeaderContainer,
      this.calendarMainContainer,
      this.calendarFooterContainer,
    );
    this.calendarContainer.append(this.pageCalendarTitle, this.pageCalendarContent);
    this.calendarHeader = new CalendarHeader(this.calendarHeaderContainer, this.model.transaction);
    this.calendarMain = new CalendarMain(this.calendarMainContainer, this.model);
    this.calendarFooter = new CalendarFooter(this.calendarFooterContainer, this.model, '2023');
    this.render();
  }

  render(): void {
    this.addListeners();
    this.root.appendChild(this.calendarContainer);
  }

  updateCalendar(): void {
    this.pageCalendarTitle.textContent = `${this.textTranslate('CalendarPage.Calendar')}`;
    this.updateCalendarHeader();
    this.updateCalendarMain();
    this.calendarFooter.updateCalendarFooter(this.yearInputElementVal);
  }

  updateCalendarMain(): void {
    this.yearInputElementVal = String(this.calendarHeader.yearInputElement.value);
    this.categoryInputElementVal = String(this.calendarHeader.categoryInputElement.value);
    this.updateTransactionData();
    this.calendarMain.createMonth(this.categoryInputElementVal, this.yearInputElementVal);
  }

  updateCalendarHeader(): void {
    this.updateTransactionData();
    this.calendarHeader.createCategoryChoice();
    this.calendarHeader.createYearArr();
  }

  updateTransactionData(): void {
    this.calendarHeader.transactionData = this.model.transaction;
  }

  addListeners(): void {
    this.calendarHeader.yearContainer.oninput = () => {
      this.updateCalendarMain();
      localStorage.setItem('calendarYear', String(this.calendarHeader.yearInputElement.value));
      this.calendarFooter.updateCalendarFooter(String(this.calendarHeader.yearInputElement.value));
    };

    this.calendarHeader.categoryContainer.oninput = () => {
      localStorage.setItem('calendarCategory', this.calendarHeader.categoryInputElement.value);
      this.updateCalendarMain();
    };
  }
}
