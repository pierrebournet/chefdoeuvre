import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderLineService } from './orderline.service';
import { OrderLineController } from './orderline.controller';
import { OrderLine } from './entities/orderline.entity';

@Module({
  imports: [TypeOrmModule.forFeature([OrderLine])],
  controllers: [OrderLineController],
  providers: [OrderLineService],
})
export class OrderLineModule {}
