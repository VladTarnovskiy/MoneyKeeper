import { BaseComponent } from '@/components/base/baseComponent';
import type { ITransactionReq } from '@/components/model/types';
import { monthArrayEng } from '@/components/pages/calendar/calendarMonthData';
import { CalendarMonthProgress } from '@/components/pages/calendar/calendarMonthProgress';

export class CalendarMain extends BaseComponent {
  root: HTMLElement;
  mainMonthContainer: HTMLElement;
  transactionData: ITransactionReq[];
  yearMoney: number;

  constructor(root: HTMLElement, transactionData: ITransactionReq[]) {
    super();
    this.root = root;
    this.transactionData = transactionData;
    this.mainMonthContainer = this.createElem(
      'div',
      'mainMonth__container grid grid-cols-4 xs:grid-cols-1 md:grid-cols-2 gap-1 w-full h=w',
    );
    this.createMonth('All', '2023');
    this.render();
    this.yearMoney = 0;
  }

  createMonth(category: string, year: string): void {
    const monthArrayHtmlElements: HTMLElement[] = [];
    this.mainMonthContainer.textContent = '';
    const everyMonthMoney: number[] = [];

    monthArrayEng.forEach((a, index) => {
      const monthHtml = this.createElem(
        'div',
        `mainMonth__${a} flex flex-col place-content-around h-48 border-2 p-3`,
      );
      const money = this.getMonthTransactions(index, category, Number(year));
      this.yearMoney += money;
      monthArrayHtmlElements.push(monthHtml);
      everyMonthMoney.push(money)
    });
    const everyMonthMoneySort = [...everyMonthMoney];
    const maxMonthMoney = everyMonthMoneySort.sort((a, b) => a > b ? 1 : -1)[everyMonthMoney.length - 1];
    monthArrayEng.forEach((a, index) => {
      new CalendarMonthProgress(<HTMLElement>monthArrayHtmlElements[index], a, <number>everyMonthMoney[index], <number>maxMonthMoney);
    })
    this.mainMonthContainer.append(...monthArrayHtmlElements);
  }

  getMonthTransactions(index: number, categoryVal: string, year: number): number {
   const monthData = this.transactionData.filter((a) => {return new Date(a.date).getMonth() === index && a.type === 'Expense' && new Date(a.date).getFullYear() === year})
   let monthDataRes = [];
   if (categoryVal === 'All'){ monthDataRes = monthData;}
   else {monthDataRes = monthData.filter((a) => {return a.category === categoryVal})}
   let monthMonew = 0;
   monthDataRes.forEach((a) => {monthMonew += a.sum});
   return monthMonew;
  }

  render(): void {
    this.root.append(this.mainMonthContainer);
  }
}
