import { Document } from "mongoose";

export interface IBook extends Document {
    title: string;
    author: string;
    genre: string;
    isbn: string;
    description: string;
    copies: number;
    available: boolean;
}