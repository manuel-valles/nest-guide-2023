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
      // user.controller.ts
      @Param('id', ParseIntPipe) id: number
    ```

- To integrate with any [DB](https://docs.nestjs.com/techniques/database), Nest provides the `@nestjs/typeorm` package (_Object Relational Mapper (ORM)_):

  - Postgres: `yarn add -D @nestjs/typeorm typeorm pg`
  - Create the required entities using the `@Entity()` decorator from `typeorm`
  - Inject the repository in the service:

    ```ts
      // user.service.ts
      constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
      ) {}
    ```

  - Add the required dependencies in modules:

    ```ts
      // user.module.ts
      imports: [TypeOrmModule.forFeature([User])],

      // app.module.ts
      imports: [
        UserModule,
        TypeOrmModule.forRoot({
          type: 'postgres',
          host: 'localhost',
          port: 25432,
          username: 'postgres',
          password: 'pass',
          database: 'my-app',
          entities: [User],
          synchronize: process.env.NODE_ENV !== 'production',
        }),
      ],
    ```

  - Update the tests ([docs](https://docs.nestjs.com/techniques/database#testing)):

    ```ts
      // *.spec.ts
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: Repository<User>,
        },
      ],

    ```
