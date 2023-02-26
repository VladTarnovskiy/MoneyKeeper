import { Chart } from 'chart.js';

import { InputSelectTwo } from '@/components/base/inputSelectTwo';
import type { SelectOptions } from '@/components/types/types';

export class InputTypeTransactionSelect extends InputSelectTwo {
  type: string;
  callBack: (dataType: string) => void;
  callCont: HTMLCanvasElement;

  constructor(
    root: HTMLElement,
    title: string,
    options: SelectOptions[],
    callBack: (dataType: string) => void,
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
    const storageTransType = localStorage.getItem('reportTypeTransaction');

    if (storageTransType !== null) {
      this.filterSelect.value = storageTransType;
    }

    this.filterSelect.addEventListener('change', () => {
      this.type = String(this.filterSelect.value);
      const chartStatus = Chart.getChart('chart');

      localStorage.setItem('reportTypeTransaction', `${this.type}`);

      if (chartStatus !== undefined) {
        chartStatus.destroy();
      }

      this.callBack(this.type);
    });

    return this.type;
  }
}
