import { Request, Response } from "express";
import { catchAsync } from "../../../shared/catchAsync";
import { BookService } from "./book.service";
import { IBook } from "./book.interface";
import httpStatus from "http-status";
import { sendResponse } from "../../../shared/sendResponse";

const getAllBooks = catchAsync(async (req: Request, res: Response) => {
  const result = await BookService.getAllBooks();
  sendResponse<IBook[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Books retrieved Successfully",
    data: result,
  });
});

const getLastTenBooks = catchAsync(async (req: Request, res: Response) => {
  const result = await BookService.getLastTenBooks();
  sendResponse<IBook[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Latest Books retrieved Successfully",
    data: result,
  });
});

const getSingleBook = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await BookService.getSingleBook(id);
  sendResponse<IBook>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Book retrieved Successfully",
    data: result,
  });
});

const addBook = catchAsync(async (req: Request, res: Response) => {
  const { ...bookinfo } = req.body;

  const result = await BookService.addBook(bookinfo);
  sendResponse<IBook>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Book Added Successfully",
    data: result,
  });
});

const addComment = catchAsync(async (req: Request, res: Response) => {
  const comment = req.body.comment;
  //   console.log(comment);

  const id = req.params.id;

  const result = await BookService.addComment(id, comment);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Comment Added Successfully",
    data: result,
  });
});

const editBook = catchAsync(async (req: Request, res: Response) => {
  const { ...info } = req.body;
  const id = req.params.id;

  const result = await BookService.editBook(id, info);
  sendResponse<IBook>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Book Updated Successfully",
    data: result,
  });
});

const deleteBook = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await BookService.deleteBook(id);
  sendResponse<IBook>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Book Deleted Successfully",
    data: result,
  });
});

export const BookController = {
  getAllBooks,
  getLastTenBooks,
  addBook,
  getSingleBook,
  addComment,
  editBook,
  deleteBook,
};
