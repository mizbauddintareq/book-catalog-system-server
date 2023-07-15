import express from "express";
import { BookController } from "./book.controller";

const router = express.Router();

router.post("/addBook", BookController.addBook);
router.get("/latest", BookController.getLastTenBooks);
router.post("/:id", BookController.addComment);
router.patch("/:id", BookController.editBook);
router.delete("/:id", BookController.deleteBook);
router.get("/:id", BookController.getSingleBook);

router.get("/", BookController.getAllBooks);

export const BookRoutes = router;
