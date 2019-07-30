import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';

import { ApiModule } from './api.module';
import { AppController } from './app.controller';
import { AppGateway } from './app.gateway';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    GraphQLModule.forRoot({
      typePaths: ['./**.*.graphql'],
      context: ({ req }) => ({ headers: req.headers }),
    }),
    ApiModule,
  ],
  controllers: [AppController],
  providers: [AppGateway],
})
export class AppModule {}
