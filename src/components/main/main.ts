import { BaseComponent } from '@/components/base/baseComponent';
import { Loader } from '@/components/loader/Loader';
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
  loader: Loader;

  constructor(bodyPage: HTMLElement, model: Model, updateHeaderSum: () => void) {
    super();
    this.bodyPage = bodyPage;
    this.container = this.createElem('main', 'container mx-auto flex');
    this.content = this.createElem('section', 'content w-full p-3');
    this.loader = new Loader(document.body);
    this.sideBar = new SideBar(this.container);
    this.overviewHtml = this.createElem('section', 'overview');
    this.overview = new Overview(this.overviewHtml, model, updateHeaderSum);
    this.container.appendChild(this.content);
    this.calendarHtml = this.createElem('section', undefined);
    this.calendar = new Calendar(this.calendarHtml, model);
    this.reportHtml = this.createElem('section', undefined);
    this.report = new Report(this.reportHtml);
    this.transactionHtml = this.createElem('section', undefined);
    this.transaction = new Transaction(this.transactionHtml, model);
    this.settingHtml = this.createElem('section', undefined);
    this.settings = new Settings(model);
    this.settingHtml.append(this.settings.node);
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
    if (index === 4) {
      this.settings.update();
    }

    const pageMain: HTMLElement | undefined = this.pagesHtmlArr[index];

    this.content.textContent = '';

    if (pageMain instanceof HTMLElement) {
      this.content.append(pageMain);
    }

    this.sideBar.buttonActive(index);

    if (index === 3) {
      this.calendar.updateCalendar();
    }

    if (index === 0) {
      this.overview.rebuild();
    }
  }
}
