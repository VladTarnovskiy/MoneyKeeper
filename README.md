# MoneyKeeper

MoneyKeeper(MKeeper) - приложение для контроля и учета доходов и расходов.
App deploy: https://animated-sorbet-950f59.netlify.app/

## Структура приложения

Приложение построено на базе SPA и состоит из шести страниц:

- страница регистрации пользователя
- страница общая информация о транзакциях приложения
- страница транзакций (добавление доходов и расходов)
- страница отчётов о доходах и расходах
- страница календаря расходов
- страница настроек

Данные о пользователе, транзакции и настройки хранятся на сервере.
Параметры сортировок хранятся в LocalStorage.

Архитектура приложения построена на базе MVC.

#### Header

1. Лого и название приложения
2. Название текущей страницы
3. Общий баланс
4. Значок аккаунта (при клике появляется popup с информацией о пользователе и кнопкой выйти из текущего аккаунта)

#### Footer

1. Гитхабы авторов приложения
2. Год создания приложения
3. Логотип курса со ссылкой на курс

#### Страница регистрации пользователя:

1. Содержит поля: имя пользователя, пароль для входя, почту и кнопку войти
2. Если пользователя нет в базе то появляется предупреждение об этом и пишется что сначала нужно зарегистрироваться
3. Регистрация имеет тот же вид, только кнопка войти меняется на кнопку зарегистрироваться

#### Страница общая информация о транзакциях приложения:

1. Содержит список из пяти элементов генерации отчета по транзакциям (за день, неделю, месяц, год и все время), каждый из которых содержит информацию в виде линейной диаграммы дохода и трат в процентном соотношении от общей суммы.
2. При клике по одному из элементов в правом окне появляется список транзакций. По умолчанию в правом окне показывается список транзакций за все время.
3. Транзакция содержит информацию: категория, подкатегория, сумма транзакции (+ если доход, - если траты), дата и время транзакции.
4. Транзакции можно сортировать по дате, сумме и фильтровать по типу транзакции.
5. При клике правой кнопке мыши по транзакции появляется всплывающее меню из двух функций (удаление транзакции, детали транзакции)
6. При выборе функции детали транзакции, появляется модальное окно с подробной информацией транзакции (описание, дата, время, категория, подкатегория, сумма транзакции)
7. При клике на свободное пространство модальное окно закрывается.

#### Страница транзакций (добавление доходов и расходов):

1. Содержит поля (тип транзакции) и сумма транзакции (валидация по числовому значению).
2. Содержит поля категории (категории предустановлены) и подкатегории транзакции (свободный текст 1-2 слова).
3. Содержит поля дата и время транзакции (валидация по дате и времени).
4. Содержит поле описание транзакции (свободный текст, можно ограничить по кол-ву символов).
5. Кнопка сохранить данную транзакцию. При сохранении транзакции, асинхронный запрос отправляет данные по транзакции серверу. В случае успеха возвращается код 200.

#### Страница репорт в диаграммах (доходы/расходы)

1. Содержит два поля с датами для выбора периода репорта. По умолчанию выбирается период за месяц, начиная с текущей даты.
2. Информация представлена в виде диаграммы и выстраивается на основании имеющихся категорий доходов и расходов в процентном соотношении.
3. При наведении указателя мыши на какую-либо ее часть появляется расшифровка категории и ее значение в процентах. Снизу от диаграммы есть расшифровка диаграммы по цвету в виде прямоугольника. При клике по прямоугольнику можно исключить/добавить какую либо категорию в диаграмме.
4. Есть возможность выбрать одну из четырех видов диаграмм (polarArea, pie, radar, doughnut).
5. Можно выбрать тип транзакции на основании на основании которой будет строиться диаграмма.
6. Есть компоненты трат и расходов в виде линейных диаграмм по категориям. Компонент категории имеет название, прогресс бар, расшифровка в процентах и в виде суммы от общего количества.

#### Страница календарь трат

1. Календарь представлен в виде таблицы 4\*3 по месяцам.
2. Каждый компонент месяца содержит название месяца, прогресс бар в процентном соотношении от общих трат и сумму трат за текущий месяц.
3. Снизу есть информация по категориям по ряду показателей (общие траты за текущий год, среднее значение трат в месяц, общий доход за год, процентное соотношение трат к доходу за год).
4. Информацию по тратам можно отфильтровать по категориям и году.

#### Настройки

1. Изменение имени пользователя.
2. Настройки языка (ru/en). По умолчанию - en.
3. Темы (светлая/темная). По умолчанию - светлая.
4. Тип валюты(usd, eur, rub, yen). По умолчанию - usd.
5. Можно изменить цвет сайд бара.
6. Удалить аккаунт.
7. Настройки пользователя сохраняются на сервер.

#### Routing

Реализован роутинг без перезагрузки страницы:

1. /overview - для главной страницы
2. /transaction - для страницы транзакции
3. /report - для страницы репорт
4. /calendar - для страницы календаря
5. /settings - для страницы настроек приложения
6. /signup - для страницы авторизации

## Server

1. Deploy: https://glitch.com/edit/#!/thankful-triangular-acapella?path=readme.md%3A1%3A0
2. Repository: https://github.com/IgorMotorin/json-server-api

## Dev stack

1. Frontend (TS, Tailwind, postcss)
2. Backend (JSON server)
3. Для сборки приложение используется webpack
4. Библиотеки: i18next для перевода, Chart.js для построения диаграмм
