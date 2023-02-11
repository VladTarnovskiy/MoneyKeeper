import './styles/index.pcss';
import './locales/i18next';
import { App } from './App';

// void i18next.init({
//   lng: 'en', // if you're using a language detector, do not define the lng option
//   debug: true,
//   resources: {
//     en: {
//       translation: {
//         key: 'hello world',
//       },
//     },
//   },
// });

const app = new App();
app.init();

