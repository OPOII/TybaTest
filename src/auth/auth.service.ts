import { Inject, Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/schema/user.schema';
import { LoginI } from './interface/login.interface';

@Injectable()
export class AuthService {
  @Inject()
  private usersService: UserService;
  constructor(private jwtService: JwtService) {}
  /*
  login(user: User): LoginI {
    const payload = {
      _id: user._id,
      email: user.email,
      name: user.name,
    };

    const { __v, ...result } = user.toJSON();
    const token = this.jwtService.sign(payload);
    return {
      token,
      user: result,
    };
  }
  */
}
