import { Injectable } from '@nestjs/common';
import { promises as fs } from 'fs';
import { join } from 'path';

import { FactoryData, ProductsData } from 'src/types';

@Injectable()
export class ProductsService {
  async getFactoryData() {
    const filePath = join(
      process.cwd(),
      'src',
      'products',
      'data',
      'products.json',
    );
    const jsonData = await fs.readFile(filePath, 'utf-8');
    const { products }: ProductsData = JSON.parse(jsonData);

    return products;
  }

  async getProductsByFactoryAndMonth(
    factoryId: number,
    monthNumber: number,
  ): Promise<Partial<FactoryData>> {
    const products = await this.getFactoryData();
    const totalProducts = [0, 0];

    products.forEach((product) => {
      const productDate = new Date(product.date);

      if (isNaN(productDate.getTime())) return;
      const productMonth = productDate.getMonth() + 1;
      if (
        product.factory_id === factoryId &&
        productMonth === Number(monthNumber)
      ) {
        totalProducts[0] += product.product1;
        totalProducts[1] += product.product2;
      }
    });

    return { product1: totalProducts[0], product2: totalProducts[1] };
  }
}
