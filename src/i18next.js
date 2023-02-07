// import i18next from 'https://deno.land/x/i18next/index.js';

// import deTranslation from './locales/de/translation.json' assert { type: 'json' };
// import enTranslation from './locales/en/translation.json' assert { type: 'json' };

// const systemLocale = Intl.DateTimeFormat().resolvedOptions().locale;

// i18next.init({
//   // debug: true,
//   fallbackLng: 'en',
//   resources: {
//     en: {
//       translation: enTranslation,
//     },
//     de: {
//       translation: deTranslation,
//     },
//   },
// });

// export default (lng: string | undefined | null) => i18next.getFixedT(lng || systemLocale);

// import { parse } from 'https://deno.land/std/flags/mod.ts';

// const { args } = Deno;
// const parsedArgs = parse(args);

// const cmd = parsedArgs._[0];

// if (cmd !== 'sayhi' && cmd !== 's') {
//   throw new Error(`unknown command ${cmd}`);
// }

// const name = parsedArgs.n || parsedArgs.name;
// const language = parsedArgs.l || parsedArgs.language;

// console.log({ name, language });
