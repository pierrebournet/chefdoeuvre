import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { AddressService } from './address.service';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { Address } from '../address/entities/address.entity';

@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Post()
  create(@Body() createAddressDto: CreateAddressDto): Promise<Address> {
    return this.addressService.create(createAddressDto);
  }

  @Get()
  findAll(): Promise<Address[]> {
    return this.addressService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Address> {
    return this.addressService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() updateAddressDto: UpdateAddressDto,
  ): Promise<Address> {
    return this.addressService.update(id, updateAddressDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.addressService.remove(id);
  }
  
}
