import { Injectable } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common';
import { Address } from './entities/address.entity';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';

@Injectable()
export class AddressService {

  async create(createAddressDto: CreateAddressDto): Promise<Address> {
    const address = new Address();
    Object.assign(address, createAddressDto);
    return await address.save();
  }

  findAll() {
    return Address.find();
  }

  findOne(id: number) {
    return Address.findOne({ where: { id } });
  }

  async update(id: number, updateAddressDto: UpdateAddressDto): Promise<Address> {
    const address = await Address.findOne({ where: { id } });

    if (!address) {
      throw new NotFoundException(`Address with ID ${id} not found`);
    }

    
    Object.assign(address, updateAddressDto);
    await address.save();

    return Address.findOne({ where: { id } });
  }

  async remove(id: number): Promise<void> {
    await Address.delete(id);
  }
}
