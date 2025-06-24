import mongoose, { Schema } from "mongoose";
import { Genre, IBook, IBookModel } from "../interfaces/book.interface";


const bookSchema = new Schema<IBook, IBookModel>(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    genre: {
      type: String,
      required: true,
      enum: Object.values(Genre),
      uppercase: true,
    },
    isbn: {
      type: String,
      required: true,
      unique: true,
    },
    description: { type: String },
    copies: {
      type: Number,
      required: true,
      min: 0,
    },
    available: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

bookSchema.statics.updateAvailability = async function (bookId: string) {
  const book = await this.findById(bookId);
  if (!book) return null;

  book.available = book.copies > 0;
  return book.save();
};

bookSchema.pre("save", function (next) {
  this.available = this.copies > 0;
  next();
});

export const Book = mongoose.model<IBook, IBookModel>("Book", bookSchema);