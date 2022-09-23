import { UserI } from 'src/user/schema/user.schema';

export interface LoginI {
  token: string;
  user: UserI;
}
