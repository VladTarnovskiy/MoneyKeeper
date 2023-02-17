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
import { StatisticBlock } from '@/components/pages/report/statisticBlock';
import type { ReportDataItem } from '@/components/pages/report/type';

import { InputChartSelect } from './inputChartSelect';

export class Report extends BaseComponent {
  root: HTMLElement;
  container: HTMLElement;
  pageTitle: HTMLElement;
  pageContent: HTMLElement;
  barContainer: HTMLElement;
  selectContainer: HTMLElement;
  bar: HTMLCanvasElement;
  statisticContainer: HTMLElement;
  inputChartSelect: InputChartSelect;
  inputTypeTransactionSelect: InputTypeTransactionSelect;
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
    this.graphType = 'polarArea';
    this.getDataFromStorage();
    this.container = this.createElem('div', 'content__container flex flex-col');
    this.pageTitle = this.createElem(
      'div',
      'page__title ml-2 text-3xl text-sky-600 mb-5 bg-sky-100 rounded pl-2',
      'Report',
    );
    this.pageContent = this.createElem('div', 'page__content flex xl:flex-col');
    this.barContainer = this.createElem(
      'div',
      'page__content flex flex-col items-center self-start justify-self-center w-[900px] h-full xl:w-[500px] xl:order-first xl:self-center',
    );
    this.selectContainer = this.createElem(
      'div',
      'flex items-center self-start w-full justify-around',
    );
    this.bar = this.createElem('canvas', 'bar');
    this.bar.setAttribute('id', 'chart');
    this.bar.getContext('2d');
    this.inputChartSelect = new InputChartSelect(
      this.selectContainer,
      'Chart type',
      ['polarArea', 'pie', 'radar', 'doughnut'],
      this.getBar,
      this.bar,
    );
    this.inputTypeTransactionSelect = new InputTypeTransactionSelect(
      this.selectContainer,
      'Transactions type',
      ['Expense', 'Income'],
      this.getBarWithType,
      this.bar,
    );
    this.statisticContainer = this.createElem('div', 'mt-2 basis-full');
    this.barContainer.appendChild(this.selectContainer);
    this.barContainer.append(this.bar);
    this.pageContent.append(this.statisticContainer, this.barContainer);
    this.container.append(this.pageTitle, this.pageContent);
    this.getStatisticBlocks().catch((err: string) => new Error(err));
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
          label: 'Percent, %',
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
            text: 'Category statistics:',
          },
        },
      },
    });
  };

  getBarWithType = (dataType: string): void => {
    this.transactionType = dataType;
    this.getBar(this.bar, this.graphType);
  };

  async getStatisticBlocks(): Promise<void> {
    await this.model.getTransactions().catch((err: string) => new Error(err));

    new StatisticBlock(
      this.statisticContainer,
      'Expenses',
      `${this.getTotalSum('Expense')} $`,
      this.getData('Expense'),
      'stone-600',
    );
    new StatisticBlock(
      this.statisticContainer,
      'Incomes',
      `${this.getTotalSum('Income')} $`,
      this.getData('Income'),
      'sky-600',
    );
    this.getBar(this.bar, this.graphType);
    this.render();
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

          trans.title = item;
          trans.color = color;
          trans.value = trans.value + itemDef.sum;
          trans.width = String(Math.round((trans.value * 100) / this.getTotalSum(type)));
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

  render(): void {
    this.root.replaceChildren();
    this.root.appendChild(this.container);
  }
}
