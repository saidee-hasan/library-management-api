import { Model, Schema, model } from "mongoose";
import { IBook } from "../interfaces/book.interface";

interface BookModel extends Model<IBook> {
    borrowBook(bookId: string, quantity: number): Promise<void>;
}

const bookSchema = new Schema<IBook>({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    genre: {
        type: String,
        enum: ["FICTION", "NON_FICTION", "SCIENCE", "HISTORY", "BIOGRAPHY", "FANTASY"],
        required: true
    },
    isbn: {
        type: String,
        required: true,
        unique: true,

    },
    description: {
        type: String,
    },
    copies: {
        type: Number,
        required: true,
        min: [0, 'Copies must be a positive number'],
        validate: {
            validator: Number.isInteger,
            message: 'Copies must be a positive number'
        }
    },
    available: {
        type: Boolean,
        default: true
    }
}, {
    versionKey: false,
    timestamps: true
})

// 🔥 Static method
bookSchema.statics.borrowBook = async function (bookId: string, quantity: number): Promise<void> {
    const book = await this.findById(bookId);
    // console.log(book);
    if (!book) {
        throw new Error('Book not found');
    }

    if (book.copies < quantity) {
        throw new Error('Not enough copies available');
    }

    book.copies -= quantity;
    if (book.copies === 0) {
        book.available = false;
    }

    await book.save();
};

export const Book = model<IBook, BookModel>('Book', bookSchema)