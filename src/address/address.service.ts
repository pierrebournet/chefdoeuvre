import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Address } from './entities/address.entity';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';import { FindOneOptions } from 'typeorm';


@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(Address)
    private addressRepository: Repository<Address>,
  ) {}

  create(createAddressDto: CreateAddressDto): Promise<Address> {
    const address = this.addressRepository.create(createAddressDto);
    return this.addressRepository.save(address);
  }

  findAll(): Promise<Address[]> {
    return this.addressRepository.find();
  }

  findOne(id: number): Promise<Address> {
    return this.addressRepository.findOne({ where: { id } });
  }

  async update(id: number, updateAddressDto: UpdateAddressDto): Promise<Address> {
    await this.addressRepository.update(id, updateAddressDto);
    return this.addressRepository.findOne({ where: { id } });
  }

  remove(id: number): Promise<void> {
    return this.addressRepository.delete(id).then(() => {});
  }
}
