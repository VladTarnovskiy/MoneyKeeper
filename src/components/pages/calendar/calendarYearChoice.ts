import { BaseComponent } from '@/components/base/baseComponent';
import { yearArray } from '@/components/pages/calendar/calendarMonthData';

export class CalendarYearChoice extends BaseComponent {
  root: HTMLElement;
  yearPopupClose!: HTMLElement;
  yearPopup!: HTMLElement;
  yearSwich!: HTMLElement;
  yearSwichName!: HTMLElement;
  calendarYear!: HTMLElement;

  constructor(root: HTMLElement) {
    super();
    this.root = root;
    this.createYearChoice();
  }

  createYearChoice(): void {
    this.calendarYear = this.createElem(
      'div',
      'flex items-center text-xl relative place-content-end',
    );

    this.yearSwich = this.createElem(
      'div',
      'year__switch ml-2 text-black text-sm hover:cursor-pointer hover:scale-110 transition-all',
      '▼',
    );
    this.yearPopup = this.createElem(
      'div',
      'w-28 max-h-40 bg-white z-10 rounded-lg absolute top-1/2 right-2 border-2 hidden p-4',
    );
    this.createYearPop(this.yearPopup);
    this.addListeners();
    this.yearSwichName = this.createElem(
      'div',
      'year__switch_name ml-1 text-black text-xl font-medium hover:cursor-pointer hover:scale-110 transition-all',
      '2023',
    );

    this.calendarYear.append(this.yearSwichName, this.yearSwich, this.yearPopup);
    this.root.appendChild(this.calendarYear);
  }

  createYearPop(yearPopup: HTMLElement): void {
    this.yearPopupClose = this.createElem(
      'div',
      'yearPopup__close absolute cursor-pointer text-3xl right-3 top-0 hover:scale-110',
      '×',
    );
    const yearPopupAll: HTMLElement[] = [];

    yearArray.map((a) =>
      yearPopupAll.push(
        this.createElem(
          'div',
          `yearPopup____${a} mb-1 hover:cursor-pointer hover:scale-110 text-1.7xl`,
          a,
        ),
      ),
    );
    yearPopup.append(...yearPopupAll, this.yearPopupClose);
  }

  addListeners(): void {
    this.calendarYear.addEventListener('click', (e) => {
      const target = <HTMLElement>e.target;
      const index = yearArray.indexOf(target.textContent!);

      if (target === this.yearPopupClose) {
        this.closeYearPopup();
      } else {
        this.openYearPopup();
      }

      if (index >= 0) {
        this.yearSwichName.textContent = target.textContent;
      }
    });
  }

  closeYearPopup(): void {
    this.yearPopup.classList.add('hidden');
    this.yearSwich.classList.remove('rotate-180');
  }

  openYearPopup(): void {
    this.yearPopup.classList.toggle('hidden');
    this.yearSwich.classList.toggle('rotate-180');
  }
}
