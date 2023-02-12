import { BaseComponent } from '@/components/base/baseComponent';
import type { ITransaction, PostJsonResponse } from '@/components/model/types';
import { Calendar } from '@/components/pages/calendar/calendar';
import { Overview } from '@/components/pages/overview/overview';
import { Report } from '@/components/pages/report/report';
import { Settings } from '@/components/pages/settings/setting';
import { Transaction } from '@/components/pages/transaction/Transaction';

import { SideBar } from './sideBar';

interface IMain {
  onsettransaction: <ITransactionReq>(
    dataU: ITransaction,
  ) => Promise<PostJsonResponse<ITransactionReq>>;
}

export class Main extends BaseComponent {
  container: HTMLElement;
  sideBar: SideBar;
  content: HTMLElement;
  calendar: Calendar;
  calendarHtml: HTMLElement;
  overviewHtml: HTMLElement;
  reportHtml: HTMLElement;
  settingHtml: HTMLElement;
  bodyPage: HTMLElement;
  report: Report;
  overview: Overview;
  transactionHtml: HTMLElement;
  transaction: Transaction;
  settings: Settings;

  constructor(bodyPage: HTMLElement, prop: IMain) {
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
    this.reportHtml = this.createElem('section', undefined);
    this.report = new Report(this.reportHtml);
    this.transactionHtml = this.createElem('section', undefined);
    this.transaction = new Transaction(this.transactionHtml, {
      onsettransaction: prop.onsettransaction,
    });
    this.settingHtml = this.createElem('section', undefined);
    this.settings = new Settings(this.settingHtml);
  }

  render(): void {
    this.bodyPage.appendChild(this.container);
  }

  updateMain(main: string, index: number): void {
    if (main === '/calendar') {
      this.content.textContent = '';
      this.content.appendChild(this.calendarHtml);
    } else if (main === '/overview') {
      this.content.textContent = '';
      this.content.appendChild(this.overviewHtml);
    } else if (main === '/report') {
      this.content.textContent = '';
      this.content.appendChild(this.reportHtml);
    } else if (main === '/transaction') {
      this.content.textContent = '';
      this.content.appendChild(this.transactionHtml);
    } else if (main === '/settings') {
      this.content.textContent = '';
      this.content.appendChild(this.settingHtml);
    } else {
      this.content.textContent = main;
    }

    this.sideBar.buttonActive(index);
  }
}
