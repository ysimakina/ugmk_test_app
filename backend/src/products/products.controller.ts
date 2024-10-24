import { Controller, Get, Res } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Response } from 'express';

@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) {}

    @Get()
    async getCsv(@Res() res: Response) {
        try {
            const products = await this.productsService.getProductsData(); 
            res.send(products);
        } catch (error) {
            res.status(500).send('Ошибка');
        }
    }
}
