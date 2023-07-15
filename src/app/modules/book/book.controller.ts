import { Request, Response } from "express";
import httpStatus from "http-status";
import { catchAsync } from "../../../shared/catchAsync";
import { sendResponse } from "../../../shared/sendResponse";
import { IBook } from "./book.interface";
import { BookService } from "./book.service";

const getAllBooks = catchAsync(async (req: Request, res: Response) => {
  const result = await BookService.getAllBooks();
  sendResponse<IBook[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Successfully retrieved books 😁",
    data: result,
  });
});

const getLastTenBooks = catchAsync(async (req: Request, res: Response) => {
  const result = await BookService.getLastTenBooks();
  sendResponse<IBook[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Successfully retrieved latest books 😁",
    data: result,
  });
});

const getSingleBook = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await BookService.getSingleBook(id);
  sendResponse<IBook>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Successfully retrieved a book 😁",
    data: result,
  });
});

const addBook = catchAsync(async (req: Request, res: Response) => {
  const { ...bookInfo } = req.body;

  const result = await BookService.addBook(bookInfo);
  sendResponse<IBook>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Successfully added a book 😁",
    data: result,
  });
});

const addComment = catchAsync(async (req: Request, res: Response) => {
  const comment = req.body.comment;

  const id = req.params.id;

  const result = await BookService.addComment(id, comment);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Successfully added a comment 😁",
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
    message: "Successfully update a book 😁",
    data: result,
  });
});

const deleteBook = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await BookService.deleteBook(id);
  sendResponse<IBook>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Successfully delete a book 😁",
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
