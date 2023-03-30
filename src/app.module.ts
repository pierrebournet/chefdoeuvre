import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TrainingsModule } from './trainings/trainings.module';
import { Training } from './trainings/entities/training.entity';
import { SessionsModule } from './sessions/sessions.module';
import { Session } from './sessions/entities/session.entity';
import { ExercisesModule } from './exercises/exercises.module';
import { Exercise } from './exercises/entities/exercises.entity';
import { UsersModule } from './users/users.module';
import { CategoryModule } from './category/category.module';
import { OrderModule } from './order/order.module';
import { OrderlineModule } from './orderline/orderline.module';
import { ProductModule } from './product/product.module';
import { User } from './users/entities/user.entity';
import { AuthModule } from './auth/auth.module';
import { FriendshipsModule } from './friendships/friendships.module';
import { Friendship } from './friendships/entities/friendship.entity';
import { ArticlesModule } from './articles/articles.module';
import { Article } from './articles/entities/article.entity';
import { CommentsModule } from './comments/comments.module';
import { Comment } from './comments/entities/comment.entity';
import { ImagesModule } from './images/images.module';
import { Image } from './images/entities/image.entity';
import { MulterModule } from '@nestjs/platform-express';
import { APP_PIPE } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common/pipes';
import { ServeStaticModule } from '@nestjs/serve-static/dist';
import { join } from 'path';
import { Category } from './category/category.entity';
import { Order } from './order/order.entity';
import { OrderLine } from './orderline/orderline.entity';
import { Product } from './product/products.entity';
import { Users } from './user/users.entity';
import { UsersModule } from './users/users.module';


@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: +process.env.DATABASE_PORT!,
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [Category, Order, OrderLine, Product, Users],
      synchronize: true,
    }),
    MulterModule.register({
        dest: './upload',
    }),
   
      ServeStaticModule.forRoot({
        rootPath: join(__dirname, `..`, `upload`)
      }),
    CategoryModule,
    OrderModule,
    UsersModule,
    AuthModule,
    ProductModule,
    OrderlineModule, 
  ],
  controllers: [AppController],
  providers: [AppService, {provide: APP_PIPE, useClass: ValidationPipe}
  
  ]
})
export class AppModule { }
