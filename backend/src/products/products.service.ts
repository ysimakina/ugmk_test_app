import { Injectable } from '@nestjs/common';
// import { parse } from 'json2csv';
import { promises as fs } from 'fs';
import { join } from 'path';

@Injectable()
export class ProductsService {
    async getProductsData(): Promise<string> {
        const filePath = join(process.cwd(), 'src', 'products', 'data', 'products.json');
        const jsonData = await fs.readFile(filePath, 'utf-8');            
        const products  = JSON.parse(jsonData);
        // const jsonArray = jsonObject.products;                    
        return products;
        // try {
        //     const csv = parse(jsonArray);
        //     return csv;
        // } catch (err) {
        //     throw new Error('Ошибка при преобразовании JSON в CSV');
        // }
    }
}