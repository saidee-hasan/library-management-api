# Library Management API

A full-featured Library Management System REST API built with **Express.js**, **TypeScript**, **Mongoose**, and **MongoDB**.

---

## Features

- **Book Management:**
  - Create, Read, Update, Delete books
  - Genre filtering and sorting
  - Proper schema validation with strict rules (required fields, enum, min values, unique ISBN)

- **Borrow Management:**
  - Borrow books with quantity control
  - Business logic to check available copies
  - Automatic stock update after borrowing
  - Availability flag auto-updates based on remaining copies

- **Aggregation Pipeline:**
  - Summary report of borrowed books with total quantity borrowed per book

- **Mongoose Instance Methods & Middleware:**
  - Instance method for updating stock and availability
  - Middleware to enforce business rules during borrow creation

- **Filtering & Sorting:**
  - Filter books by genre
  - Sort by any field (ascending or descending)
  - Limit results

- **Centralized Error Handling:**
  - Follows generic error response format as specified in assignment
  - Validation errors, 404 errors, and server errors handled gracefully

---

## Technologies Used

- **Node.js** (Express.js)
- **TypeScript**
- **MongoDB** (via Mongoose ODM)
- **Mongoose Middleware, Aggregation & Instance Methods**
- **RESTful API Design**

---

## Getting Started

### Clone the Repository

```bash
git clone https://github.com/devsafix/library-management-api
cd library-management-api
````

### Install Dependencies

```bash
npm install
```

### Create `.env` File

Create a `.env` file in the root directory and provide your MongoDB connection string:

```bash
PORT=5000
DATABASE_URL=mongodb://127.0.0.1:27017/library-management
```

### Run the Project

For development mode:

```bash
npm run dev
```

For production build:

```bash
npm run build
npm start
```

---

## API Endpoints

### Books API

| Method | Endpoint         | Description                             |
| ------ | ---------------- | --------------------------------------- |
| POST   | `/api/books`     | Create new book                         |
| GET    | `/api/books`     | Get all books (filter & sort supported) |
| GET    | `/api/books/:id` | Get book by ID                          |
| PATCH  | `/api/books/:id` | Update book                             |
| DELETE | `/api/books/:id` | Delete book                             |

#### Query Example:

```bash
GET /api/books?filter=FANTASY&sortBy=createdAt&sort=desc&limit=5
```

---

### Borrow API

| Method | Endpoint      | Description                                        |
| ------ | ------------- | -------------------------------------------------- |
| POST   | `/api/borrow` | Borrow a book (quantity deduction handled)         |
| GET    | `/api/borrow` | Borrowed books summary (aggregation pipeline used) |

---

## Business Logic Rules

* When borrowing:
  * System checks available copies using **Mongoose pre-save middleware**
  * If not enough copies → Error thrown
  * After successful borrow:
    * Instance method decreases stock and updates availability

---

## Author

**Kawser Ferdous Safi** – [devsafix.vercel.app](https://devsafix.vercel.app)

---