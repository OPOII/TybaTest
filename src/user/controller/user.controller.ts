import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  Res,
} from '@nestjs/common';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { UserDTO } from '../dto/user.dto';
import { UserService } from '../user.service';
import { UserUpdateDTO } from '../dto/updateuser.dto';
@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  @Post('create')
  @ApiOperation({
    summary: 'Create the user',
  })
  async createUser(@Res() res: Response, @Body() data: UserDTO): Promise<any> {
    try {
      var result = await this.userService.create(data);
      return res.status(HttpStatus.OK).json({
        error: result.error,
        message: result.message,
        data: result.data,
      });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        error: true,
        message: 'No se pudo realizar correctamente la peticion',
        data: [],
      });
    }
  }
  @Post('SearchRestaurant')
  @ApiOperation({
    summary: 'Search the restaurant',
  })
  async Login(
    @Res() res: Response,
    @Query('bl_latitude') bl_latitude: string,
    @Query('tr_latitude') tr_latitude: string,
    @Query('bl_longitude') bl_longitude: string,
    @Query('tr_longitude') tr_longitude: string,
    @Query('limit') limit: string,
  ): Promise<any> {
    try {
      var result = await this.userService.searchRestaurants(
        bl_latitude,
        tr_latitude,
        bl_longitude,
        tr_longitude,
        limit,
      );
      return res.status(HttpStatus.OK).json({
        error: result.error,
        message: result.message,
        data: result.data,
      });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        error: true,
        message: 'No se pudo realizar correctamente la peticion',
        data: [],
      });
    }
  }
  @Put('/update/')
  @ApiOperation({
    summary: 'Update the user',
  })
  async update(
    @Res() res: Response,
    @Query('id') id: string,
    @Body() update: UserUpdateDTO,
  ): Promise<any> {
    try {
      var result = await this.userService.update(update, id);
      return res.status(HttpStatus.OK).json({
        error: result.error,
        message: result.message,
        data: result.data,
      });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        error: true,
        message: 'No se pudo realizar correctamente la peticion ',
        data: [],
      });
    }
  }
}
