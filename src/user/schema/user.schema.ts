import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
@Schema({ timestamps: true, versionKey: false })
export class User extends Document {
  @Prop()
  name: string;
  @Prop()
  secondName: string;
  @Prop()
  phone: string;
  @Prop({ unique: true })
  email: string;
  @Prop()
  password: string;
  @Prop()
  lat: string;
  @Prop()
  long: string;
}
export const UserSchema = SchemaFactory.createForClass(User);
export interface UserI {
  _id?: string;
  name: string;
  secondName: string;
  phone: string;
  email: string;
  password: string;
  lat: string;
  long: string;
}
