# Личный кабинет продавца на маркетплейсе

[Задание](https://gitverse.ru/avito.tech/tech-internship/content/main/Tech%20Internships%20/Frontend/Frontend-trainee-assignment-2024/frontend-trainee-assignment-autumn-2024.md)

[Макет (оживание и реальность :sob:)](https://www.figma.com/design/OfcQeBSj7opTM7ieMaFHEP/Avito-Frontend-Trainee)</span>

## Как запускать

**npm**:

-   `npm run start:db` - для запуска json-server'a
-   `npm run dev:seller` - для запуска фронтенда кабинета
-   `npm run build:seller` - для сборки фронтенда

**docker**:

-   `docker compose up` в корне, с `docker-compose.yml` стандартно клиент на 80 порту

<small>изпользуются два пакета, для базы данных и для фронтенда</small>

[![burgers-feed-demo.gif](https://i.postimg.cc/3w4YSTMD/burgers-feed-demo.gif)](https://postimg.cc/sBrkxbgV)

**Страницы**:

-   стартовая с разными показателями
    -   заказы переходят на страницу с заказами с фильтрами
    -   объявления - на объявление
-   заказы
-   объявления
    -   заказы и объявления можно сортировать и фильтровать
    -   добавлена пагинация. изначально была идея использовать запросы к json-server'у, чтобы фильтровать, сортировать, группировать, но чтобы использовать несколько филтров одновременно и не терять страницы, был использовано redux хранилище. отбор производится с помощью селекторов
-   страница одного объявления
    -   используются управляющие элементы, которые использовались на общей странице обявлений
    -   реализовано редактирования обявления и добавление нового

**Использовалось**:

-   vite (react-ts, eslint)
-   redux-toolkit
-   mui
-   prettier
