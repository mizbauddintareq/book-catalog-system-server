import { Schema, model } from "mongoose";
import { IUser, IUserMethods, UserModel } from "./user.interface";
import bcrypt from "bcrypt";
import config from "../../../config";

const readSchema = new Schema({
  book: {
    type: String,
    required: true,
  },
  isComplete: {
    type: Boolean,
    required: true,
  },
});

const userSchema = new Schema<IUser, UserModel, IUserMethods>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    wishlist: {
      type: [String],
    },
    readList: {
      type: [readSchema],
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

userSchema.methods.isUserExists = async function (email: string) {
  return await User.findOne({ email }, { _id: 1, email: 1, password: 1 });
};

userSchema.methods.isPasswordMatched = async function (
  givenPassword: string,
  savedPassword: string
) {
  return await bcrypt.compare(givenPassword, savedPassword);
};

userSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, Number(config.salt_rounds));
  next();
});

export const User = model<IUser, UserModel>("User", userSchema);
