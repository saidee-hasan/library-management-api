


# 📚 Library Management API

A developer-friendly and well-structured RESTful API designed to efficiently manage books, handle borrowing operations, and support essential library functionalities—perfect for building or integrating with any modern library-style application.

---

## 🚀 Features

- 📖 Add, view, update, and delete books
- 📚 Borrow books with stock validation
- 📊 Aggregated summary of borrowed books using MongoDB aggregation
- 🔐 Schema validation and business logic enforcement
- ⚙️ Clean project structure with TypeScript & Mongoose middleware



## 🛠️ Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB (with Mongoose)
- **Language**: TypeScript
- **Tools**: Postman / Thunder Client for testing

---

## 📦 Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/arman-miaa/library-management-api
cd library-management-api
````

### 2. Install Dependencies

```bash
npm install
```

### 3. Setup Environment Variables

Create a `.env` file in the root directory:

```env
PORT=5000
MONGO_URI= your mongodb url (for local test: http://localhost:5000)
```

### 4. Run the Server

```bash
npm run dev       # Development
npm run build     # Build TypeScript
npm start         # Run production
```

---

## 📂 Project Structure (Simplified)

```
src/
├── app/
│   ├── controllers/
│   ├── models/
│   ├── interfaces/
│   ├── routes/
│   ├── middlewares/
 
├── app.ts
├── server.ts
```

---

## 🔗 API Endpoints

### 📘 Books

| Method | Endpoint         | Description      |
| ------ | ---------------- | ---------------- |
| GET    | `/api/books`     | Get all books    |
| POST   | `/api/books`     | Add a new book   |
| GET    | `/api/books/:id` | Get a book by ID |
| PUT    | `/api/books/:id` | Update a book    |
| DELETE | `/api/books/:id` | Delete a book    |

### 📗 Borrow

| Method | Endpoint      | Description                   |
| ------ | ------------- | ----------------------------- |
| POST   | `/api/borrow` | Borrow a book with validation |
| GET    | `/api/borrow` | Summary of borrowed books     |

---

## 🧾 Borrowed Books Summary Example

**GET** `/api/borrow`

Returns the total number of borrowed copies per book with book title and ISBN.

**Response:**

```json
{
  "success": true,
  "message": "Borrowed books summary retrieved successfully",
  "data": [
    {
      "book": {
        "title": "The Theory of Everything",
        "isbn": "9780553380163"
      },
      "totalQuantity": 5
    }
  ]
}
```

---

## 🧪 Testing

* Use tools like **Postman**  to test the endpoints.
* Ensure MongoDB is running locally or use a remote URI in `.env`.

---

## 🌐 Live Link

**👉 [Live API Deployment](https://your-deployed-link.vercel.app)**


---

## 🧠 Author

* [Arman Mia](https://www.linkedin.com/in/arman-miaa)
* MERN Stack Developer

---

