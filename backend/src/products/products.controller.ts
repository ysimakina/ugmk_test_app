import { Controller, Get, Param, Res } from '@nestjs/common';
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
    
    @Get(':factoryId/:monthNumber')
    async getProductsByFactoryAndMonth(
        @Param('factoryId') factoryId: number,
        @Param('monthNumber') monthNumber: number,
    ): Promise<{ product1: number; product2: number }> {
        return this.productsService.getProductsByFactoryAndMonth(factoryId, monthNumber);
    }
}