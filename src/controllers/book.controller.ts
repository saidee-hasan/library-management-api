import { Request, Response } from "express";
import { Book } from "../models/book.model";

const createBook = async (req: Request, res: Response) => {
  try {
    const book = new Book(req.body);
    const result = await book.save();
    res.status(201).json({
      success: true,
      message: "Book created successfully",
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: "Error creating book",
      error: err.message,
    });
  }
};

const getAllBooks = async (req: Request, res: Response) => {
  try {
    const filter = req.query.filter as string;
    const sortBy = (req.query.sortBy as string) || "createdAt";
    const sortOrder = (req.query.sort as string) || "desc";
    const limit = parseInt(req.query.limit as string) || 10;

    const condition = filter ? { genre: filter } : {};

    const books = await Book.find(condition)
      .sort({ [sortBy]: sortOrder === "asc" ? 1 : -1 })
      .limit(limit);

    res.status(200).json({
      success: true,
      data: books,
      message: "Books retrieved successfully",
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: "Error retrieving books",
      error: err.message,
    });
  }
};

const getBookById = async (req: Request, res: Response) => {
  try {
    const book = await Book.findById(req.params.bookId);
    if (!book) throw new Error("Book not found");
    res.status(200).json({
      success: true,
      data: book,
      message: "Book retrieved successfully",
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: "Error retrieving book",
      error: err.message,
    });
  }
};

const updateBook = async (req: Request, res: Response) => {
  try {
    const updatedData = req.body;
    const book = await Book.findByIdAndUpdate(req.params.bookId, updatedData, {
      new: true,
    });
    if (!book) throw new Error("Book not found");
    res.status(200).json({
      success: true,
      data: book,
      message: "Book updated successfully",
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: "Error updating book",
      error: err.message,
    });
  }
};

const deleteBook = async (req: Request, res: Response) => {
  try {
    await Book.findByIdAndDelete(req.params.bookId);
    res.status(200).json({
      success: true,
      message: "Book deleted successfully",
      data: null,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: "Error deleting book",
      error: err.message,
    });
  }
};

export const bookController = {
  createBook,
  getAllBooks,
  getBookById,
  updateBook,
  deleteBook,
};
