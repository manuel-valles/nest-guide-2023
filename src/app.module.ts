import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/entity/user.entity';

@Module({
  controllers: [AppController],
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
})
export class AppModule {}
