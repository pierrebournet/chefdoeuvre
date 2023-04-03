import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from './users/users.module';
import { AddressModule } from './address/address.module';
import { CartModule } from './cart/cart.module';
import { CartItemModule } from './cart-item/cart-item.module';
import { CategoryModule } from './category/category.module';
import { OrderModule } from './order/order.module';
import { OrderLineModule } from './orderline/orderline.module';
import { PaymentModule } from './payment/payment.module';
import { ProductModule } from './product/product.module';
import { AuthModule } from './auth/auth.module';
import { Address } from './address/entities/address.entity';
import { Cart } from './cart/entities/cart.entity';
import { Category } from './category/entities/category.entity';
import { Order } from './order/entities/order.entity';
import { OrderLine } from './orderline/entities/orderline.entity';
import { Product } from './product/entities/product.entity';
import { Payment } from './payment/entities/payment.entity';
import { User } from './users/entities/user.entity';
import { CartItem } from './cart-item/entities/cart-item.entity';

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
      entities: [Address, Cart, Category, Order, OrderLine, Product, Payment, User, CartItem],
      synchronize: true,
    }),

    
    UserModule,
    AddressModule,
    CartModule,
    CartItemModule,
    CategoryModule,
    OrderModule,
    OrderLineModule,
    PaymentModule,
    ProductModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
