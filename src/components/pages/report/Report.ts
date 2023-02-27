import { Chart, registerables, type ChartTypeRegistry } from 'chart.js';

Chart.register(...registerables);
import {
  baseExpenseCategoryColor,
  baseIncomeCategoryColor,
} from '@/components/base/baseCategoryData';
import { BaseComponent } from '@/components/base/baseComponent';
import type { Model } from '@/components/model/model';
import type { ITransactionReq } from '@/components/model/types';
import { InputTypeTransactionSelect } from '@/components/pages/report/InputTypeTransactionSelect';
import { StatisticBlock } from '@/components/pages/report/StatisticBlock';
import type { ProgressWidth, ReportDataItem } from '@/components/pages/report/types';

import { InputChartSelect } from './InputChartSelect';

export class Report extends BaseComponent {
  root: HTMLElement;
  container!: HTMLElement;
  pageTitle!: HTMLElement;
  pageContent!: HTMLElement;
  barContainer!: HTMLElement;
  selectContainer!: HTMLElement;
  bar!: HTMLCanvasElement;
  statisticContainer!: HTMLElement;
  inputChartSelect!: InputChartSelect;
  inputTypeTransactionSelect!: InputTypeTransactionSelect;
  chart!: Chart<keyof ChartTypeRegistry, string[], string>;
  model: Model;
  reportDataItemExpense: ReportDataItem[] = [];
  reportDataItemIncome: ReportDataItem[] = [];
  transactionType: string;
  graphType: string;

  constructor(root: HTMLElement, model: Model) {
    super();
    this.root = root;
    this.model = model;
    this.transactionType = 'Expense';
    this.graphType = 'doughnut';
    this.getDataFromStorage();

    this.rebuild();
  }

  render(): void {
    this.container = this.createElem('div', 'content__container flex flex-col');
    this.pageTitle = this.createElem(
      'div',
      'page__title ml-2 text-3xl dark:font-semibold dark:text-sky-900 dark:bg-gray-400 text-sky-600 mb-5 bg-sky-100 rounded pl-2',
      this.textTranslate('Report.title'),
    );
    this.pageContent = this.createElem('div', 'page__content flex 2xl:flex-col');
    this.statisticContainer = this.createElem('div', 'mt-2 basis-full');
    this.barContainer = this.createElem(
      'div',
      'page__content flex flex-col items-center self-start justify-self-center min-w-[600px] 2xl:min-w-0 w-[600px] h-full md:max-w-[400px] lg:w-[500px] 2xl:order-first 2xl:self-center',
    );

    this.selectContainer = this.createElem(
      'div',
      'flex items-center flex-wrap self-start w-full justify-around mb-4 gap-6',
    );
    this.bar = this.createElem('canvas', 'bar');
    this.bar.setAttribute('id', 'chart');
    this.bar.getContext('2d');
    this.inputChartSelect = new InputChartSelect(
      this.selectContainer,
      this.textTranslate('Report.chartType.title'),
      [
        {
          option: `${this.textTranslate('Report.chartType.doughnut')}`,
          value: 'doughnut',
        },
        {
          option: `${this.textTranslate('Report.chartType.polarArea')}`,
          value: 'polarArea',
        },
        {
          option: `${this.textTranslate('Report.chartType.pie')}`,
          value: 'pie',
        },
        {
          option: `${this.textTranslate('Report.chartType.radar')}`,
          value: 'radar',
        },
      ],
      this.getBar,
      this.bar,
    );
    this.inputTypeTransactionSelect = new InputTypeTransactionSelect(
      this.selectContainer,
      this.textTranslate('Report.transactionsType.title'),
      [
        {
          option: `${this.textTranslate('Report.transactionsType.expense')}`,
          value: 'Expense',
        },
        {
          option: `${this.textTranslate('Report.transactionsType.income')}`,
          value: 'Income',
        },
      ],
      this.getBarWithType,
      this.bar,
    );
    this.barContainer.append(this.selectContainer, this.bar);
    this.pageContent.append(this.statisticContainer, this.barContainer);
    this.container.append(this.pageTitle, this.pageContent);
    this.getStatisticBlocks();
  }

  getBar = (container: HTMLCanvasElement, graphType: string): void => {
    this.graphType = graphType;

    const reportDataItem: ReportDataItem[] = [];

    if (this.transactionType === 'Income') {
      reportDataItem.push(...this.reportDataItemIncome);
    } else {
      reportDataItem.push(...this.reportDataItemExpense);
    }

    const data = {
      labels: reportDataItem.map((item) => item.title),
      datasets: [
        {
          label: `${this.textTranslate('Report.percent')}, %`,
          data: reportDataItem.map((item) => item.width),
          backgroundColor: reportDataItem.map((item) => item.color),
          hoverOffset: 4,
        },
      ],
    };
    const type = graphType as keyof ChartTypeRegistry;

    this.chart = new Chart(container, {
      type,
      data,
      options: {
        plugins: {
          legend: {
            display: true,
            position: 'bottom',
            labels: {
              color: '#57534e',
              font: {
                size: 16,
                weight: '300',
              },
            },
          },
          title: {
            display: true,
            padding: 4,
            font: {
              size: 26,
              weight: '300',
            },
            color: '#0284c7',
            text: `${this.textTranslate('Report.chartTitle')}:`,
          },
        },
      },
    });
  };

  getBarWithType = (dataType: string): void => {
    this.transactionType = dataType;
    this.getBar(this.bar, this.graphType);
  };

  getCommonLength(): ProgressWidth {
    const arrForProgress = [...this.getData('Expense'), ...this.getData('Income')];
    let sumLengthValue = 0;
    let sumLengthTitle = 0;

    arrForProgress.forEach((item) => {
      const itemLengthValue = String(item.value).split('').length;
      const itemLengthTitle = item.title.split('').length;

      if (itemLengthValue > sumLengthValue) {
        sumLengthValue = itemLengthValue;
      }

      if (itemLengthTitle > sumLengthTitle) {
        sumLengthTitle = itemLengthTitle;
      }
    });

    return { lengthTitle: sumLengthTitle * 8, lengthValue: sumLengthValue * 8 };
  }

  getStatisticBlocks(): void {
    const dataWidth = this.getCommonLength();

    new StatisticBlock(
      this.statisticContainer,
      this.textTranslate('Report.titleOne'),
      `${this.getTotalSum('Expense')} ${this.model.currencySign}`,
      this.getData('Expense'),
      'stone-600',
      this.model.currencySign,
      dataWidth,
    );

    new StatisticBlock(
      this.statisticContainer,
      this.textTranslate('Report.titleTwo'),
      `${this.getTotalSum('Income')} ${this.model.currencySign}`,
      this.getData('Income'),
      'sky-600',
      this.model.currencySign,
      dataWidth,
    );
    this.getBar(this.bar, this.graphType);
  }

  getTotalSum(type: string): number {
    let totalValue = 0;

    this.model.transaction.forEach((item) => {
      if (item.type === type) {
        totalValue += item.sum;
      }
    });

    return totalValue;
  }

  getData(type: string): ReportDataItem[] {
    const items: ITransactionReq[] = [];
    const filerCategoryNoRepeat = new Set();
    const itemsExpenseCategory: string[] = [];

    type === 'Income' ? (this.reportDataItemIncome = []) : (this.reportDataItemExpense = []);

    this.model.transaction.forEach((item) => {
      if (item.type === type) {
        items.push(item);
      }
    });

    items.forEach((itemDef) => {
      itemsExpenseCategory.push(itemDef.category);
    });

    itemsExpenseCategory.forEach((item) => {
      filerCategoryNoRepeat.add(item);
    });

    filerCategoryNoRepeat.forEach((item) => {
      const trans = {
        title: '',
        color: '',
        value: 0,
        width: '0',
      };

      items.forEach((itemDef) => {
        if (itemDef.category === item) {
          let color = '';

          type === 'Income'
            ? (color = String(baseIncomeCategoryColor[item.replace(/ /g, '')]))
            : (color = String(baseExpenseCategoryColor[item.replace(/ /g, '')]));

          if (color === `undefined`) {
            color = '#3b82f6';
          }

          trans.title =
            type === 'Income'
              ? this.textTranslate(`CategoryIncome.${item}`)
              : this.textTranslate(`CategoryExpenditure.${item}`);
          trans.color = color;
          trans.value = trans.value + itemDef.sum;
          trans.width = String(((trans.value * 100) / this.getTotalSum(type)).toFixed(1));
        }
      });
      type === 'Income'
        ? this.reportDataItemIncome.push(trans)
        : this.reportDataItemExpense.push(trans);
    });

    if (type === 'Income') {
      return this.reportDataItemIncome;
    }

    return this.reportDataItemExpense;
  }

  getDataFromStorage(): void {
    const storageChartType = localStorage.getItem('chartTypeTransaction');
    const storageTransType = localStorage.getItem('reportTypeTransaction');

    if (storageChartType !== null) {
      this.graphType = storageChartType;
    }

    if (storageTransType !== null) {
      this.transactionType = storageTransType;
    }
  }

  rebuild(): void {
    this.root.replaceChildren();
    this.render();
    this.root.append(this.container);
  }
}
