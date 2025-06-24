import express from "express";
import { bookController } from "../controllers/book.controller";

const bookRoutes = express.Router();

bookRoutes.post("/", bookController.createBook);
bookRoutes.get("/", bookController.getAllBooks);
bookRoutes.get("/:bookId", bookController.getBookById);
bookRoutes.patch("/:bookId", bookController.updateBook);
bookRoutes.delete("/:bookId", bookController.deleteBook);

export default bookRoutes;
