import { Model } from "mongoose";

export type IRead = {
  book: string;
  isComplete: boolean;
  id?: string;
};

export type IUser = {
  email: string;
  password: string;
  wishlist?: string[];
  readList?: IRead[];
};

export interface IUserMethods {
  isUserExists(phoneNumber: string): Promise<Partial<IUser> | null>;
  isPasswordMatched(
    givenPassword: string,
    savedPassword: string
  ): Promise<boolean>;
}

export type UserModel = Model<IUser, Record<string, unknown>, IUserMethods>;
