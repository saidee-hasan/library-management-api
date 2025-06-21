import express, { NextFunction, Request, Response } from 'express';
import { Book } from '../models/book.model';
export const booksRoutes = express.Router();


// create book
booksRoutes.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const body = req.body
        const book = await Book.create(body)

        res.status(201).json({
            success: true,
            message: 'Book created successfully',
            data: book
        })
    } catch (error: any) {
        next(error)
    }
})

// get all books
booksRoutes.get('/', async (req: Request, res: Response, next: NextFunction) => {

    try {
        const { filter, sortBy = 'createdAt', sort = 'asc', limit = '10' } = req.query
        // console.log('sort', sort);
        // console.log('sortBy', sortBy);

        // console.log(filter);
        const query: any = {}
        if (filter) {
            query.genre = filter
            // console.log('query', query);
            // console.log('filter', filter);
        }

        const sortOrder = sort === 'desc' ? -1 : 1;

        // const books = await Book.find({ genre: filter })
        const books = await Book.find(query)
            .sort({ [sortBy as string]: sortOrder })
            .limit((Number(limit)))

        res.status(201).json({
            success: true,
            message: 'Books retrieved successfully',
            data: books
        })

    } catch (error: any) {
        next(error)
    }
})

// get book by id
booksRoutes.get('/:bookId', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const bookId = req.params.bookId;
        const book = await Book.findById(bookId);

        if (!book) {
            res.status(400).json({
                success: false,
                message: 'Book not found',
                data: null
            })
        }

        res.status(201).json({
            success: true,
            message: "Book retrieved successfully",
            data: book
        })
    } catch (error) {
        next(error)
    }
})

// updating book
booksRoutes.patch('/:bookId', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const bookId = req.params.bookId
        const updatedBook = req.body;
        const book = await Book.findByIdAndUpdate(bookId, updatedBook, { new: true, runValidators: true })

        res.status(201).json({
            success: true,
            message: 'Book updated successfully',
            data: book
        })
    } catch (error) {
        next(error)
    }
})

// Deleting Book
booksRoutes.delete('/:bookId', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const bookId = req.params.bookId
        const deleteBook = await Book.findByIdAndDelete(bookId)

        res.status(201).json({
            success: true,
            message: 'Book deleted successfully',
            data: null
        })
    } catch (error) {
        next(error)
    }
})


// global error handler (last e)
booksRoutes.use((error: any, req: Request, res: Response, next: NextFunction) => {

    if (error.name === 'ValidationError') {
        // return console.log('error', error);
        res.status(400).json({
            message: 'Validation failed',
            success: false,
            error: {
                name: error.name,
                errors: error.errors
            }
        })
    }

    // other errors
    res.status(400).json({
        message: error.message || 'Something went wrong',
        success: false,
        error
    });

})