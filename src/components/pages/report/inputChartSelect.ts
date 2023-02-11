import { Chart } from 'chart.js';

import { InputSelect } from '@/components/base/inputSelect';

export class InputChartSelect extends InputSelect {
  type: string;
  callBack: (container: HTMLCanvasElement, graphType: string) => void;
  callCont: HTMLCanvasElement;

  constructor(
    root: HTMLElement,
    title: string,
    options: string[],
    callBack: (container: HTMLCanvasElement, graphType: string) => void,
    callCont: HTMLCanvasElement,
  ) {
    super(root, title, options);
    this.root = root;
    this.title = title;
    this.options = options;
    this.type = 'bar';
    this.callBack = callBack;
    this.callCont = callCont;
    this.getValue();
  }

  getValue(): string {
    this.filterSelect.addEventListener('change', () => {
      this.type = String(this.filterSelect.value);
      const chartStatus = Chart.getChart('chart');

      if (chartStatus !== undefined) {
        chartStatus.destroy();
      }

      this.callBack(this.callCont, this.type);
    });

    return this.type;
  }
}
