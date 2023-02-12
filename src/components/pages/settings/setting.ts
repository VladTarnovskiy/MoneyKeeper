import { BaseComponent } from '@/components/base/baseComponent';

export class Settings extends BaseComponent {
  root: HTMLElement;
  settingsContainer: HTMLElement;
  pageSettingsTitle: HTMLElement;
  pageSettingsContent: HTMLElement;

  constructor(root: HTMLElement) {
    super();
    this.root = root;
    this.settingsContainer = this.createElem('div', 'content__settings_container flex flex-col');
    this.pageSettingsTitle = this.createElem(
      'div',
      'page__title ml-2 text-3xl text-sky-600 mb-5',
      'Settings',
    );
    this.pageSettingsContent = this.createElem(
      'div',
      'page__calendar_content gap-2 flex flex-col border-2 p-2 basis-1/2',
    );

    this.settingsContainer.append(this.pageSettingsTitle, this.pageSettingsContent);
    // new CalendarMain(this.pageSettingsContent);
    this.pageSettingsContent.textContent = 'Settings in process....';
    this.render();
  }

  render(): void {
    this.root.appendChild(this.settingsContainer);
  }
}
