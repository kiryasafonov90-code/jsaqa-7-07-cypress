# Netology JSAQA — 7.7 / 7.8 Cypress, CI/CD Jenkins

В репозитории находятся:
- `cinema/` — Cypress UI-тесты учебного приложения «Идём в кино»;
- `petstore-api/` — пример CRUD-тестов Swagger Petstore (не является API-частью задания 7.7).

## Требования
- Node.js 18+ и npm;
- Cypress 14;
- для запуска в браузерах — установленный Chrome, Firefox и Microsoft Edge;
- для задания 7.8 — локально установленный Jenkins с Node.js и npm в PATH.

## Структура UI-тестов
- `cinema/cypress/e2e/group-one/` — главная страница и навигация;
- `cinema/cypress/e2e/group-two/` — авторизация и бронирование.

В каждую папку добавлен отдельный дополнительный spec-тест.

## Локальный запуск
```bash
cd cinema
npm install
npx cypress verify
npm run cy:run
```

### Запуск в браузерах
```bash
npm run cy:run:chrome
npm run cy:run:firefox
npm run cy:run:edge
npm run cy:run:all
```

Команды предполагают, что соответствующие браузеры установлены на компьютере.

### Параллельный запуск двух папок
```bash
npm run cy:parallel
```

Скрипт запускает одновременно:
- все spec-файлы из `group-one` в Chrome;
- все spec-файлы из `group-two` в Firefox.

Оба процесса должны завершиться с кодом 0, чтобы общий запуск считался успешным.

## Jenkins
В корне репозитория находится `Jenkinsfile`. Создайте в Jenkins Pipeline job и укажите этот репозиторий как SCM.

Параметры сборки:
- `RUN_MODE=all` — последовательно запускает Chrome, Firefox и Edge;
- `RUN_MODE=single` — запускает браузер, выбранный в параметре `BROWSER`;
- `RUN_MODE=parallel` — параллельно запускает папку group-one в Chrome и group-two в Firefox.

Для Windows-агента Jenkins используйте установленный Node.js и npm. Для Linux-агента доступны те же команды npm.

## Cypress Dashboard (Cypress Cloud)
Для подключения к Dashboard сначала создайте проект в Cypress Cloud. Затем задайте переменные окружения:
- `CYPRESS_PROJECT_ID` — Project ID проекта;
- `CYPRESS_RECORD_KEY` — Record Key проекта.

Не публикуйте Record Key в репозитории и не вставляйте его в исходный код. После настройки выполните:
```bash
npm run cy:cloud:parallel
```
Для распределения spec-файлов по нескольким CI-машинам Cypress Cloud должен получить несколько параллельных CI-исполнителей с одинаковым Build ID. Один локальный процесс Jenkins сам по себе не создаёт несколько CI-машин.

## Примечания по проверке
Конфигурация и скрипты добавлены в репозиторий. Фактический запуск браузеров и Jenkins выполняется на машине, где установлены браузеры и Jenkins. Результаты Cypress Cloud появятся только после подключения проекта и запуска с секретным Record Key.

## Предыдущая работа 7.7
UI-тесты кинотеатра сохранены. В папке `petstore-api/` находится демонстрационный проект Swagger Petstore; он не заменяет API-приложение из задания 7.7. Для завершения той части нужен исходный архив/API из условия.
