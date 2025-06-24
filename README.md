# Library Management System API

[Live API](https://assignment-3-six-omega.vercel.app/)

## Project Objectives

- Learn proper schema design using Mongoose
- Enforce business logic (e.g., don't lend if there is no copy)
- Create summarized reports using aggregation pipeline
- Create error handling and custom error formatter
- Get used to using model static/instance methods

### Features

- **Book Management**: Add, view, update, and delete books
- **Borrowing System**: Borrow books with stock validation and due dates
- **Filter books by genre with sorting**
- **Aggregation Summary**: Get total borrowed quantity per book with MongoDB aggregation
- **Business Logic Enforcement**:

  - Prevent borrowing if copies are unavailable
  - Update availability based on stock

- **Mongoose Features**:
  - Schema validation
  - Middleware (`pre`, `post`)
  - Static and instance methods
  - Centralized and consistent error handling

## Tech Stack

- **Node.js**
- **Express.js**
- **TypeScript**
- **MongoDB** (via **Mongoose**)
- **Vercel (for deployment)**

## API Routes

### Book Management related API:

- GET /api/books → View all books and also filtering a book like ?filter=SCIENCE&sortBy=createdAt&sort=desc&limit=6 this.

- GET /api/books/:id → View specific books by Id

- POST /api/books → Add new books

- PUT /api/books/:id → Update books

- DELETE /api/books/:id → Delete books

- Borrow related API: POST /api/borrow → To lend books




## Author
- Shakil Ahamed
- Web Developer
- sakilahmed7810@example.com