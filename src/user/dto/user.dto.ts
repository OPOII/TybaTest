import { ApiProperty } from '@nestjs/swagger';

export class UserDTO {
  @ApiProperty()
  name: string;
  @ApiProperty()
  secondName: string;
  @ApiProperty()
  phone: string;
  @ApiProperty()
  email: string;
  @ApiProperty({ writeOnly: true })
  password: string;
  lat: string;
  long: string;
}
