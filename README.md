# Password Manager

## Описание

Password Manager - это веб-приложение для управления паролями, где можно сохранять пароли для веб-сайтов и адресов электронной почты. Приложение позволяет пользователям видеть список всех записей, добавлять новые записи, скрывать и отображать пароли, а также искать записи по названию сайта или электронной почты.

## Технологии

### Backend

- .NET 8.0
- ASP.NET Core Web API
- Entity Framework Core (In-Memory Database)

### Frontend

- Angular 18.1.0
- TypeScript
- HTML/CSS
- Bootstrap

## Функциональность

- Просмотр всех записей паролей, отсортированных по дате добавления (от новых к старым)
- Добавление новой записи пароля с валидацией данных
- Отображение пароля при клике на запись
- Поиск записей по названию сайта или электронной почты

## Установка и запуск

### Backend

1. Склонируйте репозиторий:
    ```sh
    git clone <URL>
    ```

2. Перейдите в директорию проекта:
    ```sh
    cd PasswordManager
    ```

3. Установите необходимые зависимости и запустите проект:
    ```sh
    dotnet restore
    dotnet run
    ```

### Frontend

1. Перейдите в директорию клиента:
    ```sh
    cd Client
    ```

2. Установите необходимые зависимости:
    ```sh
    npm install
    ```

3. Запустите Angular приложение:
    ```sh
    ng serve
    ```

Приложение будет доступно по адресу: `http://localhost:4200`.

## API Endpoints

- Получить все записи: `GET /api/passwordrecords`
- Создать новую запись: `POST /api/passwordrecords`
- Изменить видимость пароля: `PATCH /api/passwordrecords/{id}/toggle-visibility`
- Поиск записей: `GET /api/passwordrecords/search?query={query}`

## Описание компонентов

### Backend

- **Program.cs**
  - Конфигурация сервера и основных сервисов, включая CORS, подключение к базе данных и маршрутизацию.

- **Models/PasswordRecord.cs**
  - Модель для записи пароля с валидацией данных.

- **Models/PasswordRecordCreateDto.cs**
  - DTO для создания новой записи пароля.

- **Data/PasswordContext.cs**
  - Контекст базы данных для управления записями паролей.

- **Controllers/PasswordRecordsController.cs**
  - Контроллер для обработки HTTP-запросов к API (получение, добавление записей, изменение видимости пароля, поиск).

### Frontend

- **constants/APIEndpoints.ts**
  - Константы для API endpoints.

- **constants/HttpOptions.ts**
  - Опции для HTTP-запросов.

- **services/password-record.service.ts**
  - Сервис для взаимодействия с API.

- **models/password-record.model.ts**
  - Интерфейс для модели записи пароля.

- **models/password-record-create-dto.model.ts**
  - Интерфейс для DTO создания новой записи пароля.

- **app.config.ts**
  - Конфигурация приложения Angular.

- **app.component.ts**
  - Главный компонент приложения, включающий логику поиска и отображения записей.

- **modal-create-password-record-component.ts**
  - Компонент для модального окна создания новой записи пароля.

- **app.component.html**
  - Шаблон для главного компонента приложения, включающий таблицу записей и элементы управления.

## Скриншоты

![Главный экран](screenshots/main_screen.png)
![Модальное окно создания записи](screenshots/create_modal.png)