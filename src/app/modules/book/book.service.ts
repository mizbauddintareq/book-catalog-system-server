import { IBook } from "./book.interface";
import { Book } from "./book.model";

const getAllBooks = async () => {
  const result = await Book.find({});
  return result;
};

const getLastTenBooks = async () => {
  const result = await Book.find({}).sort({ createdAt: -1 }).limit(10);
  return result;
};

const getSingleBook = async (id: string) => {
  const result = await Book.findById(id);
  return result;
};

const addBook = async (payload: IBook) => {
  const result = await Book.create(payload);
  return result;
};

const addComment = async (id: string, comment: string) => {
  const result = await Book.findByIdAndUpdate(
    id,
    {
      $push: { comments: comment },
    },
    { new: true }
  );
  console.log(result);

  return result;
};

const editBook = async (id: string, payload: IBook) => {
  const result = await Book.findByIdAndUpdate(id, payload, { new: true });
  return result;
};

const deleteBook = async (id: string) => {
  const result = await Book.findByIdAndDelete(id);
  return result;
};

export const BookService = {
  getAllBooks,
  getLastTenBooks,
  addBook,
  getSingleBook,
  addComment,
  editBook,
  deleteBook,
};
