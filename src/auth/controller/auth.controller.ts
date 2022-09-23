import {
  Controller,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from '../auth.service';
import { LocalAuthGuard } from '../guard/local-auth.guard';
import { Response, Request } from 'express';
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  /*
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() req: Request, @Res() res: Response): Promise<any> {
    const user = <any>req.user;
    const loginResult = this.authService.login(user);

    if (req.user && loginResult.token) {
      return res.status(HttpStatus.OK).json({
        error: false,
        msg: 'Ok',
        ...loginResult,
      });
    } else {
      return res.status(HttpStatus.FORBIDDEN).json({
        error: true,
        msg: 'Datos de inicio incorrectos',
        token: null,
        user: null,
      });
    }
  }
*/
}
