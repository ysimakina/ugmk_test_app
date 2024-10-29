import { Injectable } from '@nestjs/common';
import { promises as fs } from 'fs';
import { join } from 'path';

import { FactoryData } from 'src/types';

interface Data {
  products: FactoryData[];
}

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
    const products: Data = JSON.parse(jsonData);

    return products.products;
  }

  async getProductsByFactoryAndMonth(
    factoryId: number,
    monthNumber: number,
  ): Promise<Partial<FactoryData>> {
    const products = await this.getFactoryData();
    let product1Total = 0;
    let product2Total = 0;

    products.forEach((product) => {
      const productDate = new Date(product.date);

      if (isNaN(productDate.getTime())) return;
      const productMonth = productDate.getMonth() + 1;
      if (
        product.factory_id === Number(factoryId) &&
        productMonth === Number(monthNumber)
      ) {
        product1Total += product.product1;
        product2Total += product.product2;
      }
    });

    return { product1: product1Total, product2: product2Total };
  }
}
