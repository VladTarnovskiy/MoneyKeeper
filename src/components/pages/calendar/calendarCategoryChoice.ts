import { baseCategoryExpenditureDataEng } from '@/components/base/baseCategoryData';
import { BaseComponent } from '@/components/base/baseComponent';

export class CalendarCategoryChoice extends BaseComponent {
  root: HTMLElement;
  categoryPopupClose: HTMLElement;
  categoryPopup: HTMLElement;
  categorySwich: HTMLElement;
  calendarCategory: HTMLElement;
  categorySwichName: HTMLElement;

  constructor(root: HTMLElement) {
    super();
    this.root = root;
    this.calendarCategory = this.createElem(
      'div',
      'flex items-center text-xl relative place-content-end',
    );

    this.categorySwich = this.createElem(
      'div',
      'category__switch ml-2 text-black text-sm hover:cursor-pointer hover:scale-110 transition-all',
      '▼',
    );
    this.categoryPopup = this.createElem(
      'div',
      'w-48 max-h-auto bg-white z-10 rounded-lg absolute top-1/2 right-2 border-2 hidden p-4',
    );
    this.categoryPopupClose = this.createElem(
      'div',
      'categoryPopup__close absolute cursor-pointer text-3xl right-3 top-0 hover:scale-110',
      '×',
    );
    const categoryPopupAll: HTMLElement[] = [];

    baseCategoryExpenditureDataEng.map((a) =>
      categoryPopupAll.push(
        this.createElem(
          'div',
          `categoryPopup__${a} mb-1 hover:cursor-pointer hover:scale-110 text-1.7xl`,
          a,
        ),
      ),
    );
    this.categoryPopup.append(...categoryPopupAll, this.categoryPopupClose);
    this.addListeners();
    this.categorySwichName = this.createElem(
      'div',
      'category__switch_name ml-1 text-black text-xl font-medium hover:cursor-pointer hover:scale-110 transition-all',
      'Home',
    );

    this.calendarCategory.append(this.categorySwichName, this.categorySwich, this.categoryPopup);
    this.root.appendChild(this.calendarCategory);
  }


  addListeners(): void {
    this.calendarCategory.addEventListener('click', (e) => {
      const target = <HTMLElement>e.target;
      const index = baseCategoryExpenditureDataEng.indexOf(target.textContent!);

      if (target === this.categoryPopupClose) {
        this.closeCategoryPopup();
      } else {
        this.openCategoryPopup();
      }

      if (index >= 0) {
        this.categorySwichName.textContent = target.textContent;
      }
    });
  }

  closeCategoryPopup(): void {
    this.categoryPopup.classList.add('hidden');
    this.categorySwich.classList.remove('rotate-180');
  }

  openCategoryPopup(): void {
    this.categoryPopup.classList.toggle('hidden');
    this.categorySwich.classList.toggle('rotate-180');
  }
}
