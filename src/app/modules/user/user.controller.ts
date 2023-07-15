import { Request, Response } from "express";
import { catchAsync } from "../../../shared/catchAsync";
import { sendResponse } from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { IUser } from "./user.interface";
import { UserService } from "./user.service";

const createUser = catchAsync(async (req: Request, res: Response) => {
  const { ...user } = req.body;

  const result = await UserService.createUser(user);

  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User created Successfully",
    data: result,
  });
});

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const { ...loginData } = req.body;

  const result = await UserService.loginUser(loginData);
  // console.log(result);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User logged in Successfully",
    data: result,
  });
});

const addToWishlist = catchAsync(async (req: Request, res: Response) => {
  const book = req.body.book;
  console.log(book);

  const id = req.params.id;

  const result = await UserService.addToWishlist(id, book);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Book Added to Wishlist Successfully",
    data: result,
  });
});

const addToReadList = catchAsync(async (req: Request, res: Response) => {
  const { ...payload } = req.body;
  console.log(payload);

  const id = req.params.id;

  const result = await UserService.addToReadList(id, payload);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Book Added to Readlist Successfully",
    data: result,
  });
});

const updateReadlist = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const { ...payload } = req.body;
  const result = await UserService.updateReadlist(id, payload);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Rating Updated Successfully",
    data: result,
  });
});

const getSingleUser = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await UserService.getSingleUser(id);
  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User retrieved Successfully",
    data: result,
  });
});

export const UserController = {
  createUser,
  loginUser,
  addToWishlist,
  getSingleUser,
  addToReadList,
  updateReadlist,
};
