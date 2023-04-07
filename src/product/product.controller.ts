import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

// Déclaration du contrôleur avec le préfixe de route 'product'
@Controller('product')
export class ProductController {
  // Injection du ProductService dans le contrôleur
  constructor(private readonly productService: ProductService) {}

  // Route POST pour créer un nouveau produit avec les données du corps de la requête
  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  // Route GET pour récupérer tous les produits, y compris ceux du fournisseur externe
  @Get()
  findAllWithExternal() {
    return this.productService.findAllWithExternal();
  }

  // Route GET pour récupérer un produit spécifique en fonction de l'ID
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(+id);
  }

  // Route GET pour récupérer les configurations d'un produit spécifique en fonction de l'ID
  @Get('configurations/:id')
  getConfigurations(@Param('id') id: string) {
    return this.productService.getProductConfigurations(+id);
  }

  // Route PUT pour mettre à jour un produit spécifique en fonction de l'ID avec les données du corps de la requête
  @Put(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(+id, updateProductDto);
  }

  // Route DELETE pour supprimer un produit spécifique en fonction de l'ID
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(+id);
  }

  // Route GET pour récupérer les produits du fournisseur externe
  @Get('external')
  async getExternalProducts() {
    return await this.productService.getExternalProducts();
  }
}
