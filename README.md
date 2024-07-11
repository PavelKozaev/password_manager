# Password Manager

## ��������

Password Manager - ��� ���-���������� ��� ���������� ��������, ��� ����� ��������� ������ ��� ���-������ � ������� ����������� �����. ���������� ��������� ������������� ������ ������ ���� �������, ��������� ����� ������, �������� � ���������� ������, � ����� ������ ������ �� �������� ����� ��� ����������� �����.

## ����������

### Backend

- .NET 8.0
- ASP.NET Core Web API
- Entity Framework Core (In-Memory Database)

### Frontend

- Angular 18.1.0
- TypeScript
- HTML/CSS
- Bootstrap

## ����������������

- �������� ���� ������� �������, ��������������� �� ���� ���������� (�� ����� � ������)
- ���������� ����� ������ ������ � ���������� ������
- ����������� ������ ��� ����� �� ������
- ����� ������� �� �������� ����� ��� ����������� �����

## ��������� � ������

### Backend

1. ����������� �����������:
    ```sh
    git clone <URL>
    ```

2. ��������� � ���������� �������:
    ```sh
    cd PasswordManager
    ```

3. ���������� ����������� ����������� � ��������� ������:
    ```sh
    dotnet restore
    dotnet run
    ```

### Frontend

1. ��������� � ���������� �������:
    ```sh
    cd Client
    ```

2. ���������� ����������� �����������:
    ```sh
    npm install
    ```

3. ��������� Angular ����������:
    ```sh
    ng serve
    ```

���������� ����� �������� �� ������: `http://localhost:4200`.

## API Endpoints

- �������� ��� ������: `GET /api/passwordrecords`
- ������� ����� ������: `POST /api/passwordrecords`
- �������� ��������� ������: `PATCH /api/passwordrecords/{id}/toggle-visibility`
- ����� �������: `GET /api/passwordrecords/search?query={query}`

## �������� �����������

### Backend

- **Program.cs**
  - ������������ ������� � �������� ��������, ������� CORS, ����������� � ���� ������ � �������������.

- **Models/PasswordRecord.cs**
  - ������ ��� ������ ������ � ���������� ������.

- **Models/PasswordRecordCreateDto.cs**
  - DTO ��� �������� ����� ������ ������.

- **Data/PasswordContext.cs**
  - �������� ���� ������ ��� ���������� �������� �������.

- **Controllers/PasswordRecordsController.cs**
  - ���������� ��� ��������� HTTP-�������� � API (���������, ���������� �������, ��������� ��������� ������, �����).

### Frontend

- **constants/APIEndpoints.ts**
  - ��������� ��� API endpoints.

- **constants/HttpOptions.ts**
  - ����� ��� HTTP-��������.

- **services/password-record.service.ts**
  - ������ ��� �������������� � API.

- **models/password-record.model.ts**
  - ��������� ��� ������ ������ ������.

- **models/password-record-create-dto.model.ts**
  - ��������� ��� DTO �������� ����� ������ ������.

- **app.config.ts**
  - ������������ ���������� Angular.

- **app.component.ts**
  - ������� ��������� ����������, ���������� ������ ������ � ����������� �������.

- **modal-create-password-record-component.ts**
  - ��������� ��� ���������� ���� �������� ����� ������ ������.

- **app.component.html**
  - ������ ��� �������� ���������� ����������, ���������� ������� ������� � �������� ����������.

## ���������

![������� �����](screenshots/main_screen.png)
![��������� ���� �������� ������](screenshots/create_modal.png)