import { Response } from 'express';
import { Controller, Get, NotFoundException, Param, Res } from '@nestjs/common';

import { FactoryData } from 'src/types';

import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) {}

    @Get()
    async getFactoryData(@Res() res: Response) {
        try {
            const products = await this.productsService.getFactoryData(); 
            res.send(products);
        } catch (error) {
            res.status(500).send('Ошибка при получении данных');
        }
    }
    
    @Get(':factoryId/:monthNumber')
    async getProductsByFactoryAndMonth(
        @Param('factoryId') factoryId: number,
        @Param('monthNumber') monthNumber: number,
    ): Promise<Partial<FactoryData>> {
        return this.productsService.getProductsByFactoryAndMonth(factoryId, monthNumber);
    }
}
