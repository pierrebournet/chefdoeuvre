import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateOrderDto {
  @IsNotEmpty()
  @IsNumber()
  userId: number;

  @IsNotEmpty()
  @IsNumber()
  shippingAddressId: number;

  @IsNotEmpty()
  @IsNumber()
  billingAddressId: number;

  @IsNotEmpty()
  @IsNumber()
  paymentId: number;

  @IsNotEmpty()
  @IsNumber()
  total: number;

  @IsNotEmpty()
  status: string;
}
