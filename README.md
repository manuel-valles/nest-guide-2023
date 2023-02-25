# Nest Guide (v>9.0.0)

A quick guide for NestJS | February 2023

## 0. Docs and CLI

- [Official docs](https://docs.nestjs.com/)
- Install CLI globally: `$ npm i -g @nestjs/cli`
- Reference: `$ nest`
- Create a new project: `$ nest n MyApp`
- Generate a module: `$ nest g module user`
- Generate a controller: `$ nest g controller user`
- Generate a service: `$ nest g service user`

## 1. Techniques

- To add [validation](https://docs.nestjs.com/techniques/validation) to the requests:

  - `$ yarn add -D class-validator class-transformer`
    ```ts
    // main.ts
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true, // This will filter out properties not included in the expected DTO
      }),
    );
    ```
  - Update DTO accordingly:

    ```ts
      // create-user.dto.ts
      @IsEmail()
      email: string;

    ```

  - Bind the corresponding [pipes](https://docs.nestjs.com/pipes):

    ```ts
      // user-controller.ts
      @Param('id', ParseIntPipe) id: number
    ```
