/* eslint-disable prettier/prettier */
import { Inject, Injectable } from '@nestjs/common'
import { MySQLProvider } from 'src/database/mysql.provider'
import { Product } from './product.entity'
import { ProductInput } from './dto/product.input';

@Injectable()
export class ProductService {

  constructor(@Inject('DATABASE') private readonly mysql: MySQLProvider){}

  async findAll(): Promise<Product[]> {
    const conn = await this.mysql.getConnection()
    const [results] = await conn.query('SELECT * FROM products');
    const products = (results as any[]).map(prod => {
      const product = new Product();
      product.id = prod.id;
      product.product = prod.product;
      product.price = prod.price;
      return product;
    });

    return products;
  }

  async getById(id: number): Promise<Product> {
    const conn = await this.mysql.getConnection()
    
    const [queryRes] = await conn.query(`SELECT * FROM products WHERE id = ?`, [id])
    const product = (queryRes as any).map(prod => {
      const product = new Product();
      product.id = prod.id
      product.product = prod.product;
      product.price = prod.price;
      return product;
    })
    
    return product
  }

  async create(entity: ProductInput): Promise<Product> {
    const conn = await this.mysql.getConnection()
    try {
      await conn.query('INSERT INTO products (product, price) values (?, ?)', [entity.product, entity.price])
      return entity
    } catch (err) {
      return err.message
    }
  }

  async update(id:number, entity: Product): Promise<boolean> {
    const conn = await this.mysql.getConnection()
    try {
      await conn.query('UPDATE products SET product = ?, price = ? WHERE id = ?', [entity.product, entity.price, id])
      return true
    } catch {
      return false
    }
  }

  async delete(id:number): Promise<boolean> {
    const conn = await this.mysql.getConnection()
    try {
      await conn.query('DELETE FROM products WHERE id = ?', [id])
      return true
    } catch {
      return false
    }
  }
}


