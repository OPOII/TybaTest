import { ApiProperty } from '@nestjs/swagger';

export class UserUpdateDTO {
  @ApiProperty()
  name: string;
  @ApiProperty()
  secondName: string;
  @ApiProperty()
  phone: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  lat: string;
  @ApiProperty()
  long: string;
}
