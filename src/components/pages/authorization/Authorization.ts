import { InputComponent } from '@/components/base/InputComponent';

import { svgStore } from '@/assets/svgStore';

import { BaseComponent } from '../../base/baseComponent';

export class Authorization extends BaseComponent {
  root: HTMLElement;
  container: HTMLElement;

  constructor(root: HTMLElement) {
    super();
    this.root = root;
    this.container = this.createElem(
      'div',
      'flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8',
    );
    const container1 = this.createElem2('div', {
      class: '-space-y-px rounded-md shadow-sm',
    });
    const container2 = this.createElem2('div', {
      class: 'flex items-center',
    });
    const container3 = this.createElem2('div');

    new InputComponent(container1, {
      label: {
        for: 'email-address',
        class: 'sr-only',
        textContent: 'Email address',
      },
      input: {
        id: 'email-address',
        name: 'email',
        placeholder: 'Email address',
        required: 'true',
        autocomplete: 'email',
        type: 'email',
        class:
          'relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm',
      },
    });
    new InputComponent(container1, {
      label: {
        for: 'password',
        class: 'sr-only',
        textContent: 'Password',
      },
      input: {
        id: 'password',
        name: 'password',
        placeholder: 'Password',
        required: 'true',
        autocomplete: 'current-password',
        type: 'password',
        class:
          'relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm',
      },
    });

    new InputComponent(container2, {
      input: {
        id: 'remember-me',
        name: 'remember-me',
        type: 'checkbox',
        class: 'h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500',
      },
      label: {
        for: 'remember-me',
        class: 'ml-2 text-sm text-gray-900',
        textContent: 'Registrations',
      },
    });

    const button = this.createElem2('button', {
      type: 'submit',
      class:
        'group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2',
      textContent: 'Sign in',
    });

    const span = this.createElem2('span', {
      class: 'absolute inset-y-0 left-0 flex items-center pl-3',
      innerHTML: svgStore.lock,
    });

    button.append(span);
    container3.append(button);

    const form = this.createElem2('form', {
      class: 'mt-8 space-y-6',
      action: '#',
      method: 'POST',
    });

    form.append(container1, container2, container3);

    this.container.append(form);

    this.render();
  }

  render(): void {
    this.root.appendChild(this.container);
  }
}
