import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
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

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(),
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
