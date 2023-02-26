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

  - `$ yarn add class-validator class-transformer`
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

  - Postgres: `yarn add @nestjs/typeorm typeorm pg`
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

- To use crossed-services you need to export it from the original module and import it in the desired one, i.e.:

  ```ts
  // user.module.ts
    exports: [UserService],

  // auth.module.ts
    imports: [UserModule], // UserModule just makes the UserService available, nothing else
  ```

- To handle [authentication](https://docs.nestjs.com/security/authentication), `Passport` is a straightforward library that has a rich ecosystem of strategies that implement various authentication mechanisms:

  - `$ yarn add @nestjs/passport passport passport-local`
  - `$ yarn add -D @types/passport-local`
  - Create a `strategy`:

    ```ts
    // user.module.ts
    @Injectable()
    export class LocalStrategy extends PassportStrategy(Strategy) {
      constructor(private authService: AuthService) {
        super({ usernameField: 'email' });
      }

      async validate(username: string, password: string): Promise<any> {
        const user = await this.authService.validateUser(username, password);
        if (!user) {
          throw new UnauthorizedException();
        }
        return user;
      }
    }
    ```

    _NOTE_: `Passport-local` strategy by default expects `username` and `password` in the request body. Pass an options object to specify different property names, for example: `super({ usernameField: 'email' })`

  - Create an `AuthService` (that includes the controller business logic), and update module and controller:

    ```ts
    // auth.module.ts
    imports: [UserModule, PassportModule],
    providers: [AuthService, LocalStrategy],


    // auth.controller.ts
    constructor(private authService: AuthService) {}

    @UseGuards(AuthGuard('local'))
    @Post('/login')
    async login(@Body() { email, password }: LoginDTO) {
      return this.authService.validateUser(email, password);
    }
    ```
