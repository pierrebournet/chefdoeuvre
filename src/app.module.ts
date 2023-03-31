import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '../src/user/user.module';
import { OrderModule } from './order/order.module';
import { OrderLineModule } from './orderline/orderline.module';
import { ProductModule } from './product/product.module';
import { CategoryModule } from './category/category.module';
import { CartModule } from './cart/cart.module';
import { CartItemModule } from './cart-item/cart-item.module';
import { AddressModule } from './address/address.module';
import { PaymentModule } from './payment/payment.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'your_user',
      password: 'your_password',
      database: 'your_database',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    UserModule,
    OrderModule,
    OrderLineModule,
    ProductModule,
    CategoryModule,
    CartModule,
    CartItemModule,
    AddressModule,
    PaymentModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
