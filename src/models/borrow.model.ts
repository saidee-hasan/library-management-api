import { model, Schema } from "mongoose";
import { IBorrow } from "../interfaces/borrow.interface";
import { Book } from "./book.model";

const borrowSchema = new Schema<IBorrow>(
  {
    book: { type: Schema.Types.ObjectId, ref: "Book", required: true },
    quantity: {
      type: Number,
      required: true,
      min: [1, "Quantity must be at least 1"],
    },
    dueDate: { type: Date, required: true },
  },
  { timestamps: true, versionKey: false }
);

// middleware to check if book exists and has enough copies
borrowSchema.pre("save", async function (next) {
  const book = await Book.findById(this.book);
  if (!book) {
    throw new Error("Book not found");
  }
  if (book.copies < this.quantity) {
    throw new Error("Not enough copies available");
  }
  next();
});

export const Borrow = model<IBorrow>("Borrow", borrowSchema);
