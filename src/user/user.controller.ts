
import { Controller, Post, Res, HttpStatus, Body, Get, Param, NotFoundException, Delete, Query, Put } from '@nestjs/common';
import { UserService } from "./user.service";
import { CreateUserDTO } from "./dto/user.dto";

@Controller('user')
export class UserController {

    constructor(private userService: UserService) { }

    @Put('/')
    async createUser(@Res() res, @Body() createUserDTO: CreateUserDTO) {
        const user = await this.userService.createUser(createUserDTO);
        return res.status(HttpStatus.OK).json({
            message: 'User Successfully Created',
            user
        });
    }

    @Get('/')
    async getUsers(@Res() res) {
        const users = await this.userService.getUser();
        return res.status(HttpStatus.OK).json(users);
    }

    /*
    // GET single product: /product/5c9d46100e2e5c44c444b2d1
    @Get('/:productID')
    async getProduct(@Res() res, @Param('productID') productID) {
        const product = await this.productService.getProduct(productID);
        if (!product) throw new NotFoundException('Product does not exist!');
        return res.status(HttpStatus.OK).json(product);
    }

    // Delete Product: /delete?productID=5c9d45e705ea4843c8d0e8f7
    @Delete('/delete')
    async deleteProduct(@Res() res, @Query('productID') productID) {
        const productDeleted = await this.productService.deleteProduct(productID);
        if (!productDeleted) throw new NotFoundException('Product does not exist!');
        return res.status(HttpStatus.OK).json({
            message: 'Product Deleted Successfully',
            productDeleted
        });
    }

    // Update Product: /update?productID=5c9d45e705ea4843c8d0e8f7
    @Put('/update')
    async updateProduct(@Res() res, @Body() createProductDTO: CreateProductDTO, @Query('productID') productID) {
        const updatedProduct = await this.productService.updateProduct(productID, createProductDTO);
        if (!updatedProduct) throw new NotFoundException('Product does not exist!');
        return res.status(HttpStatus.OK).json({
            message: 'Product Updated Successfully',
            updatedProduct 
        });
    }
*/
}