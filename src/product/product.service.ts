// product.service.ts
import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ShowVariablesDto } from './dto/show-variables.dto';
import { SaveConfigurationDto } from './dto/save-configuration.dto'; // Ajouter cette ligne
import { Product } from './entities/product.entity';
import fetch from 'node-fetch';

@Injectable()
export class ProductService {
  private readonly apiUrl = 'https://www.realisaprint.com/api';
  private readonly shopId = 'YOUR_SHOP_ID'; // Remplacez par votre ID Boutique
  private readonly apiKey = 'YOUR_API_KEY'; // Remplacez par votre clé secrète

  create(createProductDto: CreateProductDto) {
    const product = Product.create(createProductDto);
    return product.save();
  }

  findAll() {
    return Product.find({ relations: ['category'] });
  }

  findOne(id: number) {
    return Product.findOne({ where: { id }, relations: ['category'] });
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    await Product.update({ id }, updateProductDto);
    return Product.findOne({ where: { id }, relations: ['category'] });
  }

  remove(id: number) {
    return Product.delete(id);
  }

  async getExternalProducts(): Promise<any> {
    const response = await fetch(`${this.apiUrl}/products`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        shop_id: this.shopId,
        api_key: this.apiKey,
      }),
    });

    if (!response.ok) {
      throw new Error(`Erreur lors de la récupération des produits : ${response.statusText}`);
    }

    const data = await response.json();
    return data.products;
  }

  async getProductConfigurations(productId: number): Promise<any> {
    const response = await fetch(`${this.apiUrl}/configurations`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        shop_id: this.shopId,
        api_key: this.apiKey,
        product: productId,
      }),
    });

    if (!response.ok) {
      throw new Error('Erreur lors de la récupération des configurations de produit');
    }

    return response.json();
  }

  async showVariables(showVariablesDto: ShowVariablesDto): Promise<any> {
    const response = await fetch(`${this.apiUrl}/show_variables`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        shop_id: this.shopId,
        api_key: this.apiKey,
        ...showVariablesDto,
      }),
    });

    if (!response.ok) {
      throw new Error('Erreur lors de la récupération des options à afficher/cacher');
    }

    return response.json();
  }

  async saveConfiguration(saveConfigurationDto: SaveConfigurationDto): Promise<any> {
    const response = await fetch(`${this.apiUrl}/save_configuration`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        shop_id: this.shopId,
        api_key: this.apiKey,
        ...saveConfigurationDto,
      }),
    });

    if (!response.ok) {
      throw new Error('Erreur lors de la sauvegarde de la configuration');
    }

    return response.json();
  }


  async getPrice(code: number, quantity: number, country?: string): Promise<any> {
    const response = await fetch(`${this.apiUrl}/get_price`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        shop_id: this.shopId,
        api_key: this.apiKey,
        code,
        quantity,
        country,
      }),
    });
  
    if (!response.ok) {
      throw new Error("Erreur lors de la récupération du prix d'une configuration");
    }
  
    const data = await response.json();
  
    // Calcul de la marge ici
    const marge = 0.2; // Remplacez 0.2 par le pourcentage de marge souhaité
    data.price = data.price * (1 + marge);
  
    return data;
  }


  // Ajouter cette méthode
async getConfigDetails(code: number): Promise<any> {
  const response = await fetch(`${this.apiUrl}/config_details`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      shop_id: this.shopId,
      api_key: this.apiKey,
      code,
    }),
  });

  if (!response.ok) {
    throw new Error("Erreur lors de la récupération des détails d'une configuration");
  }

  return response.json();
}

async findAllWithExternal(): Promise<any> {
  const localProducts = await this.findAll();
  const externalProducts = await this.getExternalProducts();
  return localProducts.concat(externalProducts);
}

  
}
