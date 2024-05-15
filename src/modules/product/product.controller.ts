/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common'
import { ProductService } from './product.service'
import { Product } from './product.entity';

@Controller('products')
export class ProductController{
    constructor(private readonly productService: ProductService) {}

    @Get()
    async findAll(): Promise<Product[]> {
        return this.productService.findAll();
    }

    @Get(':id')
    async findById(@Param('id') id: number): Promise<Product> {
        return this.productService.getById(id)
    }

    @Post()
    async create(@Body() entity: Product) {
        return this.productService.create(entity)
    }

    @Put(':id')
    async update(@Body() entity: Product, @Param('id') id: number) {
        return this.productService.update(id, entity)
    }

    @Delete(':id')
    async remove(@Param('id') id : number){
        return this.productService.delete(id)
    }
}