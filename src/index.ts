import { Model } from '@/components/model/model';
import type { IRes } from '@/components/model/types';

const model = new Model();
const email = 'abc@abc.com';
const password = 'password';

const response = model.registerUser({ email, password });

response
  .then((res: IRes): void => {
    const div = document.createElement('div');

    div.innerHTML = JSON.stringify(res);
    document.body.appendChild(div);
  })
  .catch((err: string): Error => new Error(err));
