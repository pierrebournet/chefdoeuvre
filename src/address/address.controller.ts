import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { AddressService } from './address.service';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { Address } from '../address/entities/address.entity';

@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Post()
  create(@Body() createAddressDto: CreateAddressDto): Promise<Address> { // Création d'une nouvelle adresse
    return this.addressService.create(createAddressDto);
  }

  @Get()
  findAll(): Promise<Address[]> { // Récupération de toutes les adresses
    return this.addressService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Address> { // Récupération d'une adresse par son ID
    return this.addressService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() updateAddressDto: UpdateAddressDto,
  ): Promise<Address> { // Mise à jour d'une adresse par son ID
    return this.addressService.update(id, updateAddressDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> { // Suppression d'une adresse par son ID
    return this.addressService.remove(id);
  }
}
