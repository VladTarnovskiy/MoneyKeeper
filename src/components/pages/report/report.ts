import { Chart, registerables, type ChartTypeRegistry } from 'chart.js';

Chart.register(...registerables);
import { BaseComponent } from '@/components/base/baseComponent';
import { InputChartSelect } from '@/components/pages/report/inputChartSelect';
import { StatisticBlock } from '@/components/pages/report/statisticBlock';

interface DataItem {
  color: string;
  title: string;
  value: string;
  width: string;
}

const dataTest: DataItem[] = [
  {
    color: '#ef4444',
    title: 'Car',
    value: '1200 $',
    width: '100',
  },
  {
    color: '#3b82f6',
    title: 'Home',
    value: '300 $',
    width: '30',
  },
  {
    color: '#10b981',
    title: 'Cage',
    value: '300 $',
    width: '30',
  },
  {
    color: '#a855f7',
    title: 'Product',
    value: '200 $',
    width: '20',
  },
  {
    color: '#f59e0b',
    title: 'Bank',
    value: '400 $',
    width: '40',
  },
  {
    color: '#3b82f6',
    title: 'Medicine',
    value: '300 $',
    width: '30',
  },
  {
    color: '#ef4444',
    title: 'Car',
    value: '1200 $',
    width: '95',
  },
  {
    color: '#3b82f6',
    title: 'Home',
    value: '300 $',
    width: '30',
  },
  {
    color: '#10b981',
    title: 'Cage',
    value: '300 $',
    width: '30',
  },
  {
    color: '#a855f7',
    title: 'Product',
    value: '200 $',
    width: '20',
  },
  {
    color: '#f59e0b',
    title: 'Bank',
    value: '400 $',
    width: '40',
  },
  {
    color: '#3b82f6',
    title: 'Medicine',
    value: '300 $',
    width: '30',
  },
];

export class Report extends BaseComponent {
  root: HTMLElement;
  container: HTMLElement;
  pageTitle: HTMLElement;
  pageContent: HTMLElement;
  barContainer: HTMLElement;
  bar: HTMLCanvasElement;
  statisticContainer: HTMLElement;
  inputChartSelect: InputChartSelect;
  graphType: string;
  chart!: Chart<keyof ChartTypeRegistry, string[], string>;

  constructor(root: HTMLElement) {
    super();
    this.root = root;
    this.container = this.createElem('div', 'content__container flex flex-col');
    this.graphType = 'polarArea';
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
    this.bar = this.createElem('canvas', 'bar');
    this.bar.setAttribute('id', 'chart');
    this.bar.getContext('2d');
    this.inputChartSelect = new InputChartSelect(
      this.barContainer,
      'Chart type',
      ['pie', 'doughnut', 'radar', 'polarArea'],
      this.getBar,
      this.bar,
    );
    this.statisticContainer = this.createElem('div', 'mt-2 basis-full');
    this.barContainer.append(this.bar);
    this.pageContent.append(this.statisticContainer, this.barContainer);
    this.container.append(this.pageTitle, this.pageContent);
    this.getStatisticBlocks();
    this.getBar(this.bar, this.graphType);
    this.render();
  }

  getBar = (container: HTMLCanvasElement, graphType: string): void => {
    const data = {
      labels: dataTest.map((item) => item.title),
      datasets: [
        {
          label: 'Percent, %',
          data: dataTest.map((item) => item.width),
          backgroundColor: dataTest.map((item) => item.color),
          hoverOffset: 4,
        },
      ],
    };
    const x = graphType as keyof ChartTypeRegistry;

    this.chart = new Chart(container, {
      type: x,
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

  getStatisticBlocks(): void {
    new StatisticBlock(this.statisticContainer, 'Expenses', '2223 $', dataTest, 'stone-600');
    new StatisticBlock(this.statisticContainer, 'Incomes', '8000 $', dataTest, 'sky-600');
  }

  render(): void {
    this.root.replaceChildren();
    this.root.appendChild(this.container);
  }
}
