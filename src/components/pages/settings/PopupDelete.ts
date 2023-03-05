import { BaseComponent } from '@/components/base/baseComponent';
import type { Model } from '@/components/model/model';
import { Button } from '@/components/pages/authorization/Button';

export class PopupDelete extends BaseComponent {
  node: HTMLElement;
  model: Model;
  callback: () => void;

  constructor(model: Model) {
    super();
    this.callback = () => {
      return;
    };

    this.model = model;
    this.node = this.build();
  }

  build(): HTMLElement {
    const bgHide = this.createElem(
      'div',
      'fixed w-full h-full opacity-50 top-0 left-0 bg-slate-800 z-10',
    );
    const container = this.createElem(
      'div',
      'fixed transaction__container w-1/2 h-1/2 z-20 bg-white items-center shadow-2xl border-[1px] rounded p-1 mb-2 flex flex-col -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2',
    );
    const title = this.createElem(
      'div',
      'page__title ml-2 text-3xl text-sky-600 dark:text-sky-900 dark:font-bold mb-5',
      this.textTranslate('Settings.Button2'),
    );

    const message = this.createElem2('div', {
      class: `h-6 mb-auto mx-auto text-center text-red-500`,
      textContent: this.textTranslate('Settings.Message1'),
    });

    const inputButton2 = new Button({
      text: 'delete',
      type: 'button',
      disabled: false,
      onClick: this.onClick,
    }).node;

    container.append(title, message, inputButton2);
    bgHide.append(container);

    const cont = this.createElem('div', '');

    cont.append(bgHide, container);

    bgHide.addEventListener('click', () => {
      cont.remove();
    });

    return cont;
  }

  onClick = (): void => {
    this.model
      .deleteAccount()
      .then((res) => {
        if (res.status === 200) {
          localStorage.removeItem('userdata');
          location.hash = '#signup';
        }

        this.node.remove();
        this.callback();
      })
      .catch((err: string) => {
        new Error(err);
      });
  };

  setCallback(callback: () => void): void {
    this.callback = callback;
  }
}
