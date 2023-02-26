import { Chart } from 'chart.js';

import { InputSelectTwo } from '@/components/base/inputSelectTwo';
import type { SelectOptions } from '@/components/types/types';

export class InputChartSelect extends InputSelectTwo {
  type: string;
  callBack: (container: HTMLCanvasElement, graphType: string) => void;
  callCont: HTMLCanvasElement;

  constructor(
    root: HTMLElement,
    title: string,
    options: SelectOptions[],
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
    const storageChartType = localStorage.getItem('chartTypeTransaction');

    if (storageChartType !== null) {
      this.filterSelect.value = storageChartType;
    }

    this.filterSelect.addEventListener('change', () => {
      this.type = String(this.filterSelect.value);
      const chartStatus = Chart.getChart('chart');

      localStorage.setItem('chartTypeTransaction', `${this.type}`);

      if (chartStatus !== undefined) {
        chartStatus.destroy();
      }

      this.callBack(this.callCont, this.type);
    });

    return this.type;
  }
}
