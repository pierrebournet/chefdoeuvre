import { IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateOrderLineDto {
  @IsNumber()
  orderId?: number;

  @IsNumber()
  productId?: number;

  @IsNumber()
  quantity?: number;

  @IsNumber()
  price?: number;
}