import { Request, Response } from "express";
import mongoose from "mongoose";
import { Book } from "../models/book.model";
import { Borrow } from "../models/borrow.model";
import { handleValidationError } from "../error/errorValidation";


// Borrow Book
export const borrowBook = async (req: Request, res: Response) => {
  try {
    const { book, quantity, dueDate } = req.body;

    if (!mongoose.Types.ObjectId.isValid(book)) {
      res.status(400).json({
        message: "Invalid book ID",
        success: false,
      });
    }

    const bookToBorrow = await Book.findById(book);
    if (!bookToBorrow) {
      res.status(404).json({
        message: "Book not found",
        success: false,
      });
      return;
    }

    if (bookToBorrow.copies < quantity) {
      res.status(400).json({
        message: "Not enough copies available",
        success: false,
        availableCopies: bookToBorrow.copies,
      });
    }

    const borrow = await Borrow.create({
      book,
      quantity,
      dueDate: new Date(dueDate),
    });

    res.status(201).json({
      success: true,
      message: "Book borrowed successfully",
      data: borrow,
    });
  } catch (error: any) {
    if (error.name === "ValidationError") {
      res.status(400).json(handleValidationError(error));
    } else {
      res.status(400).json({
        message: "Failed to borrowed book",
        success: false,
        error,
      });
    }
  }
};


// Borrowed books summary
export const getBorrowedBooksSummary = async (req: Request, res: Response) => {
  try {
    const summary = await Borrow.aggregate([
      {
        $group: {
          _id: "$book",
          totalQuantity: { $sum: "$quantity" },
        },
      },
      {
        $lookup: {
          from: "books",
          localField: "_id",
          foreignField: "_id",
          as: "book",
        },
      },
      {
        $unwind: "$book",
      },
      {
        $project: {
          _id: 0,
          "book.title": 1,
          "book.isbn": 1,
          totalQuantity: 1,
        },
      },
    ]);

    res.status(200).json({
      success: true,
      message: "Borrowed books summary retrieved successfully",
      summary,
    });
  } catch (error: any) {
    if (error.name === "ValidationError") {
      res.status(400).json(handleValidationError(error));
    } else {
      res.status(500).json({
        message: "Failed to retrieve borrowed books summary",
        success: false,
        error: error.message,
      });
    }
  }
};