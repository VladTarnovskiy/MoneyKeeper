import { BaseComponent } from '../../base/baseComponent';

export class CalendarMain extends BaseComponent {
  root: HTMLElement;

  constructor(root: HTMLElement) {
    super();
    this.root = root;
    //   this.container = this.createElem('div', 'content__container flex flex-col');
    //   this.pageTitle = this.createElem(
    //     'div',
    //     'page__title ml-2 text-3xl text-sky-600 mb-5',
    //     'Calendar',
    //   );
    //   this.pageContent = this.createElem('div', 'page__content gap-2 flex');
    //   this.calendarHeaderContainer = this.createElem(
    //     'div',
    //     'expense__period border-2 p-2 basis-1/2',
    //   );
    //   this.calendarMainContainer = this.createElem(
    //     'div',
    //     'transactions__list border-2 p-2 basis-1/2',
    //   );
    //   this.calendarFooterContainer = this.createElem(
    //     'div',
    //     'transactions__list border-2 p-2 basis-1/2',
    //   );
    //   this.pageContent.append(this.calendarHeaderContainer, this.calendarMainContainer, this.calendarFooterContainer);
    //   this.container.append(this.pageTitle, this.pageContent);
    //   this.render();
    //   this.calendarFooter = new CalendarFooter(this.calendarFooterContainer);
    //   this.calendarHeader = new CalendarHeader(this.calendarHeaderContainer);
    //   this.calendarMain = new CalendarMain(this.calendarMainContainer);
    // }

    // render(): void {
    //   this.root.appendChild(this.container);
    // }
  }
}
