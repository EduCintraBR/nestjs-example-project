/* eslint-disable prettier/prettier */
import { Resolver, Query, Args, Mutation } from "@nestjs/graphql";
import { Product } from "./dto/product";
import { ProductService } from "./product.service";
import { ProductInput } from "./dto/product.input";

@Resolver(of => Product)
export class ProductResolver {
    constructor(private readonly productService: ProductService) {}

    @Query(returns => [Product], { name: 'getAllProducts'})
    async getAllProducts(): Promise<Product[]> {
        const products = await this.productService.findAll()
        const productsToReturn = products.map(prod => {
            const productToReturn = new Product()
            productToReturn.id = prod.id
            productToReturn.product = prod.product
            productToReturn.price = prod.price
            return productToReturn
        })

        return productsToReturn
    }

    @Query(returns => [Product], { name: 'getProductById' })
    async findById(@Args('id') id: number) : Promise<Product> {
        return await this.productService.getById(id)
    }

    @Mutation(returns => Product, { name: 'createProduct' })
    async create(@Args('input') input: ProductInput): Promise<Product> {
        return this.productService.create(input)
    }

    @Mutation(returns => Boolean, { name: 'updateProduct' })
    async update(@Args('input') input: ProductInput) : Promise<boolean> {
        return this.productService.update(input.id, input)
    }

    @Mutation(returns => Boolean, { name: 'deleteProduct' })
    async remove(@Args('id') id: number) : Promise<boolean> {
        return this.productService.delete(id)
    }
}