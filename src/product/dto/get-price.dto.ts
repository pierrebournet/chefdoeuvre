import { IsInt, IsOptional, IsString } from 'class-validator';

export class GetPriceDto {
  @IsInt()
  code: number;

  @IsInt()
  quantity: number;

  @IsOptional()
  @IsString()
  country?: string;
}
