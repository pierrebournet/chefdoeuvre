import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AddressService } from './address.service';
import { AddressController } from './address.controller';
import { Address } from './entities/address.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Address])], // Importation du module TypeOrm avec la feature Address
  controllers: [AddressController], // Ajout du contrôleur AddressController
  providers: [AddressService], // Ajout du service AddressService
})
export class AddressModule {}

