import mongoose, { Schema } from "mongoose";
import { Book } from "./book.model";
import { IBorrow } from "../interfaces/borrow.interface";


const borrowSchema = new Schema<IBorrow>(
  {
    book: {
      type: Schema.Types.ObjectId,
      ref: "Book",
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
    dueDate: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

borrowSchema.post("save", async function (doc) {
  const book = await Book.findById(doc.book);
  if (!book) return;

  book.copies -= doc.quantity;
  await book.save();

  await Book.updateAvailability(book._id.toString());
});

export const Borrow = mongoose.model<IBorrow>("Borrow", borrowSchema);