import * as mongoose from 'mongoose';

const r = type => ({
  type,
  required: true
});

export interface User {
  email: string,
  password: string,
  deviceToken?: string,
  query?: object
}

interface IUser extends User, mongoose.Document {}

const UserSchema: any = new mongoose.Schema({
  email: r(String),
  password: r(String),
  deviceToken: String,
  query: Object
});

export const User = mongoose.model<IUser>('User', UserSchema);
