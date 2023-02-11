import { BaseComponent } from '../base/baseComponent';
import { Calendar } from '../pages/calendar/calendar';
import { Overview } from '../pages/overview/overview';

import { SideBar } from './sideBar';

export class Main extends BaseComponent {
  container: HTMLElement;
  sideBar: SideBar;
  content: HTMLElement;
  calendar: Calendar;
  calendarHtml: HTMLElement;
  overviewHtml: HTMLElement;
  bodyPage: HTMLElement;
  overview: Overview;

  constructor(bodyPage: HTMLElement) {
    super();
    this.bodyPage = bodyPage;
    this.container = this.createElem('main', 'container mx-auto flex');
    this.content = this.createElem('section', 'content w-full border-t-2 border-l-2 p-3');
    this.sideBar = new SideBar(this.container);
    this.overviewHtml = this.createElem('overview', undefined);
    this.overview = new Overview(this.overviewHtml);
    this.container.appendChild(this.content);
    this.calendarHtml = this.createElem('section', undefined);
    this.calendar = new Calendar(this.calendarHtml);
  }

  render(): void {
    this.bodyPage.appendChild(this.container);
  }

  updateMain(main: string, index: number): void {
    if (main === '/calendar') {
      this.content.textContent = '';
      this.content.append(this.calendarHtml);
    } else if (main === '/overview') {
      this.content.textContent = '';
      console.log('overview')
      this.content.append(this.overviewHtml);
    } else {
      this.content.textContent = main;
    }

    this.sideBar.buttonActive(index);
  }
}
