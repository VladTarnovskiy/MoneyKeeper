import { BaseComponent } from '@/components/base/baseComponent';
import { SideBar } from '@/components/main/sideBar';
import { Calendar } from '@/components/pages/calendar/calendar';
import { Overview } from '@/components/pages/overview/overview';
import { Settings } from '@/components/pages/settings/setting';

export class Main extends BaseComponent {
  container: HTMLElement;
  content: HTMLElement;
  calendarHtml: HTMLElement;
  overviewHtml: HTMLElement;
  bodyPage: HTMLElement;
  settingsHtml: HTMLElement;
  pagesHtmlArr: HTMLElement[];
  sideBar: SideBar;

  constructor(bodyPage: HTMLElement) {
    super();
    this.bodyPage = bodyPage;
    this.container = this.createElem('main', 'container mx-auto flex');
    this.content = this.createElem('section', 'content w-full border-t-2 border-l-2 p-3');
    this.sideBar = new SideBar(this.container);
    this.overviewHtml = this.createElem('section', 'overview');
    new Overview(this.overviewHtml);
    this.container.appendChild(this.content);
    this.calendarHtml = this.createElem('section', 'calendar');
    new Calendar(this.calendarHtml);
    this.settingsHtml = this.createElem('section', 'calendar');
    new Settings(this.settingsHtml);
    this.pagesHtmlArr = [
      this.overviewHtml,
      this.createElem('section', '/transaction'),
      this.createElem('section', '/report'),
      this.calendarHtml,
      this.settingsHtml,
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
