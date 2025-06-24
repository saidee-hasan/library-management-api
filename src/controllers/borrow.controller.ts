import { Request, Response } from "express";
import { Book } from "../models/book.model";
import { Borrow } from "../models/borrow.model";

const borrowBook = async (req: Request, res: Response) => {
  try {
    const { book: bookId, quantity, dueDate } = req.body;

    const borrow = new Borrow({ book: bookId, quantity, dueDate });
    await borrow.save();

    // After borrow is saved, now decrease copies
    const book = await Book.findById(bookId);
    if (book) {
      await book.decreaseCopies(quantity);
    }

    res.status(201).json({
      success: true,
      message: "Book borrowed successfully",
      data: borrow,
    });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Error borrowing book",
      error: err.message,
    });
  }
};

const getBorrowSummary = async (req: Request, res: Response) => {
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
          as: "bookInfo",
        },
      },
      { $unwind: "$bookInfo" },
      {
        $project: {
          _id: 0,
          book: {
            title: "$bookInfo.title",
            isbn: "$bookInfo.isbn",
          },
          totalQuantity: 1,
        },
      },
    ]);
    res.status(200).json({
      success: true,
      message: "Borrowed books summary retrieved successfully",
      data: summary,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: "Error retrieving borrow summary",
      error: err.message,
    });
  }
};

export const borrowController = {
  borrowBook,
  getBorrowSummary,
};
