import { Schema, model } from "mongoose"
import { IBorrow } from "../interfaces/borrow.interface"

const borrowSchema = new Schema<IBorrow>({
    book: {
        type: Schema.Types.ObjectId,
        ref: "Book",
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        min: [1, 'Quantity must be a positive number'],
        validate: {
            validator: Number.isInteger,
            message: 'Quantity must be a positive number'
        }
    },
    dueDate: {
        type: Date,
        required: true
    }
}, {
    versionKey: false,
    timestamps: true
})

export const BorrowDetails = model<IBorrow>('Borrow', borrowSchema)