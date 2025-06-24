import mongoose from "mongoose";
import { IBook } from "./book.interface";

export interface IBorrow {
  book: mongoose.Types.ObjectId | IBook;
  quantity: number;
  dueDate: Date;
  createdAt: Date;
  updatedAt: Date;
}
