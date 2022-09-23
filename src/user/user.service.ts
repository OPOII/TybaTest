import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { UserDTO } from './dto/user.dto';
import { User } from './schema/user.schema';
import { UserUpdateDTO } from './dto/updateuser.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User') private userModel: Model<User>,
    private readonly configService: ConfigService,
  ) {}
  bcrypt = require('bcryptjs');
  axios = require('axios');
  private ulrApi = this.configService.get<string>('URLAPI');
  private apiKey = this.configService.get<string>('APIKEY');
  private apiHost = this.configService.get<string>('APIHOST');
  async create(data: UserDTO): Promise<any> {
    try {
      let searchedUser = await this.userModel.findOne({ email: data.email });
      data.lat = '';
      data.long = '';
      if (searchedUser) {
        return {
          error: true,
          message:
            'The user with the email ' +
            data.email +
            ' already exist, please enter another email',
          data: [],
        };
      } else {
        try {
          let created = await this.userModel.create(data);
          if (created) {
            return {
              error: false,
              message: 'The user was added succesfully',
              data: created,
            };
          }
        } catch (error) {
          return {
            error: true,
            message: error,
            data: [],
          };
        }
      }
    } catch (error) {
      return {
        error: true,
        message: error,
        data: [],
      };
    }
  }

  async update(data: Partial<UserUpdateDTO>, id: string): Promise<any> {
    try {
      let objectid = new mongoose.Types.ObjectId(id);
      let searched = await this.userModel.findById({ _id: objectid });
      if (searched) {
        var updated = await this.userModel.findByIdAndUpdate(
          { _id: objectid },
          data,
          { new: true },
        );
        if (updated) {
          return {
            error: false,
            message: 'The user was updated successfully',
            data: updated,
          };
        } else {
          return {
            error: true,
            message: 'The user cant be updated',
            data: [],
          };
        }
      } else {
        return {
          error: true,
          message: 'The user you try to search isnt in the database',
          data: [],
        };
      }
    } catch (error) {
      return {
        error: true,
        message: error,
        data: [],
      };
    }
  }
  async encryptPassword(password: string): Promise<any> {}

  async searchRestaurants(
    bl_latitude: string,
    tr_latitude: string,
    bl_longitude: string,
    tr_longitude: string,
    limits: string,
  ): Promise<any> {
    //let bl_latitudeNumber=Number(bl_latitude);
    //let tr_latitudeNumber=Number(tr_latitude);
    //let bl_longitudeNumber=Number(bl_longitude);
    //let tr_longitudeNumber=Number(tr_longitude);
    //let limitsNumber=Number(limits);
    const options = {
      method: 'GET',
      url: this.ulrApi,
      params: {
        bl_latitude: bl_latitude,
        tr_latitude: tr_latitude,
        bl_longitude: bl_longitude,
        tr_longitude: tr_longitude,
        restaurant_tagcategory_standalone: '10591',
        restaurant_tagcategory: '10591',
        limit: limits,
        currency: 'USD',
        open_now: 'false',
        lunit: 'km',
        lang: 'en_US',
      },
      headers: {
        'X-RapidAPI-Key': this.apiKey,
        'X-RapidAPI-Host': this.apiHost,
      },
    };
    let answer: any;
    let errors: any;
    await this.axios
      .request(options)
      .then(function (response) {
        answer = response.data;
      })
      .catch(function (error) {
        errors = error;
      });
    if (answer) {
      return {
        error: false,
        message: 'Successfully request',
        data: answer,
      };
    } else {
      return {
        error: true,
        message: errors,
        data: [],
      };
    }
  }
}
