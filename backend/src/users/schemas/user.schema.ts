import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { UserRole } from '../common/enums/user-role.enum';

export type UserDocument = User & Document;

@Schema({ _id: false })
export class User {
  @Prop({ required: true, unique: true })
  id: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop()
  phone?: string;

  @Prop({ required: true, enum: UserRole, default: UserRole.USER })
  role: UserRole;

  @Prop({ required: true })
  hashed_password: string;

  @Prop({ required: true })
  created_at: string;

  @Prop({ required: true })
  updated_at: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
