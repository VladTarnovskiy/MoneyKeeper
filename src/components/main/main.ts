import { BaseComponent } from '@/components/base/baseComponent';
import type { Model } from '@/components/model/model';
import { Calendar } from '@/components/pages/calendar/calendar';
import { Overview } from '@/components/pages/overview/overview';
import { Report } from '@/components/pages/report/report';
import { Settings } from '@/components/pages/settings/setting';
import { Transaction } from '@/components/pages/transaction/Transaction';

import { SideBar } from './sideBar';

export class Main extends BaseComponent {
  container: HTMLElement;
  content: HTMLElement;
  calendarHtml: HTMLElement;
  overviewHtml: HTMLElement;
  reportHtml: HTMLElement;
  settingHtml: HTMLElement;
  bodyPage: HTMLElement;
  report: Report;
  sideBar: SideBar;
  calendar: Calendar;
  overview: Overview;
  transactionHtml: HTMLElement;
  transaction: Transaction;
  settings: Settings;
  pagesHtmlArr: HTMLElement[];

  constructor(bodyPage: HTMLElement, model: Model) {
    super();
    this.bodyPage = bodyPage;
    this.container = this.createElem('main', 'container mx-auto flex');
    this.content = this.createElem('section', 'content w-full p-3');
    this.sideBar = new SideBar(this.container);
    this.overviewHtml = this.createElem('section', 'overview');
    this.overview = new Overview(this.overviewHtml);
    this.container.appendChild(this.content);
    this.calendarHtml = this.createElem('section', undefined);
    this.calendar = new Calendar(this.calendarHtml);
    this.reportHtml = this.createElem('section', undefined);
    this.report = new Report(this.reportHtml);
    this.transactionHtml = this.createElem('section', undefined);
    this.transaction = new Transaction(this.transactionHtml, model);
    this.settingHtml = this.createElem('section', undefined);
    this.settings = new Settings(this.settingHtml);
    this.pagesHtmlArr = [
      this.overviewHtml,
      this.transactionHtml,
      this.reportHtml,
      this.calendarHtml,
      this.settingHtml,
    ];
  }

  render(): void {
    this.bodyPage.appendChild(this.container);
  }

  updateMain(index: number): void {
    const pageMain: HTMLElement | undefined = this.pagesHtmlArr[index];

    this.content.textContent = '';

    if (pageMain instanceof HTMLElement) {
      this.content.append(pageMain);
    }

    this.sideBar.buttonActive(index);
  }
}
