import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/entity/user.entity';
import { AuthModule } from './auth/auth.module';

@Module({
  controllers: [AppController],
  imports: [
    AuthModule,
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
})
export class AppModule {}
