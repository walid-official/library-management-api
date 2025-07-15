

# 📚 Library Management API

A robust RESTful API for managing library operations, built with Express, TypeScript, Mongoose, and Zod. It allows users to manage book records and borrowing activities with full CRUD capabilities, ensuring data integrity through strong schema validation, business rule enforcement (like stock availability), and middleware-enhanced request handling. The API supports advanced features such as query-based filtering, dynamic sorting, and pagination for book retrieval. Additionally, it leverages MongoDB's aggregation pipeline to provide insightful summaries of borrow records. The architecture follows a clean, modular structure—making it scalable, maintainable, and ready for production-grade deployments.

---

## 🧭 Table of Contents

- [📚 Features](#-features)
- [📁 Project Structure](#-project-structure)
- [🚀 Installation](#-installation)
- [⚙️ Configuration](#-configuration)
- [📌 API Endpoints](#-api-endpoints)
- [🧪 Usage Examples](#-usage-examples)
- [💡 Business Logic & Validations](#-business-logic--validations)
- [🐞 Error Format](#-error-format)
- [👨‍💻 Contributors](#-contributors)
- [📄 License](#-license)

---

## 📚 Features

- ✅ CRUD operations on books
- 📘 Borrow books with due date and quantity check
- 🧠 Business logic enforcement (availability, stock updates)
- 🧪 Schema validation with Zod
- 🛠 MongoDB Aggregation pipeline for summaries
- ⚙️ Filtering, sorting
- 🔁 Mongoose middleware and static methods

---

## 📁 Project Structure

```
src/
├── app/
│   ├── config/               # MongoDB connection config
│   │   └── db.ts
│   ├── controllers/          # Request handlers for Book & Borrow
│   │   ├── book.controller.ts
│   │   └── borrow.controller.ts
│   ├── interfaces/           # TypeScript interface definitions
│   ├── middlewares/          # Custom Express middlewares
│   │   └── errorHandler.ts
│   ├── models/               # Mongoose models/schemas
│   │   ├── book.model.ts
│   │   └── borrow.model.ts
│   ├── routes/               # Route definitions
│   │   ├── book.route.ts
│   │   └── borrow.route.ts
│   ├── services/             # Business logic and service layer
│   │   ├── book.service.ts
│   │   └── borrow.service.ts
│   ├── zodSchemas/           # Request validation with Zod
│   │   ├── book.zod.ts
│   │   └── borrow.zod.ts
├── app.ts                    # App initialization and middleware setup
├── server.ts                 # Server bootstrap (entry point)
.env                          # Environment variables
package.json                  # Project metadata and dependencies
tsconfig.json                 # TypeScript configuration


````

---

## 🚀 Installation

```bash
# Clone the repo
git clone https://github.com/walid-official/library-management-api.git

# Install dependencies
pnpm install

# Create .env file
cp .env.example .env
````

---

## ⚙️ Configuration

Create a `.env` file in the root directory with:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/library-db
DB_USER=username
DB_PASS=password
DB_NAME=database_name
```


---

## 📌 API Endpoints

### 📖 Book Routes

| Method | Endpoint         | Description                        |
| ------ | ---------------- | ---------------------------------- |
| POST   | `/api/books`     | Create a new book                  |
| GET    | `/api/books`     | Get all books with filtering/query |
| GET    | `/api/books/:id` | Get book by ID                     |
| PUT    | `/api/books/:id` | Update book details                |
| DELETE | `/api/books/:id` | Delete a book                      |

#### 🔍 Query Parameters for `/api/books`

| Parameter | Type     | Description                               |
| --------- | -------- | ----------------------------------------- |
| `filter`  | `string` | Filter by genre (e.g., `FICTION`)         |
| `sortBy`  | `string` | Field to sort by (e.g., `createdAt`)      |
| `sort`    | `string` | Sort direction: `asc` or `desc`           |
| `limit`   | `number` | Limit the number of results (default: 10) |

> Example: `/api/books?filter=FANTASY&sortBy=createdAt&sort=desc&limit=5`

---

### 📦 Borrow Routes

| Method | Endpoint      | Description                    |
| ------ | ------------- | ------------------------------ |
| POST   | `/api/borrow` | Borrow a book                  |
| GET    | `/api/borrow` | Borrow summary via aggregation |

---


## 🧪 Usage Examples

### ✅ Create Book

```http
POST /api/books
```

```json
{
  "title": "The Theory of Everything",
  "author": "Stephen Hawking",
  "genre": "SCIENCE",
  "isbn": "9780553380163",
  "description": "An overview of cosmology and black holes.",
  "copies": 5,
  "available": true
}
```

---

### 📘 Borrow Book

```http
POST /api/borrow
```

```json
{
  "book": "64ab3f9e2a4b5c6d7e8f9012",
  "quantity": 2,
  "dueDate": "2025-07-18T00:00:00.000Z"
}
```

---

### 📊 Borrowed Summary

```http
GET /api/borrow
```

Response:

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

## 💡 Business Logic & Validations

* Books must have valid `genre`, non-negative `copies`, and unique `isbn`
* Borrowing reduces available `copies`; sets `available: false` when depleted
* Borrow quantity must be ≤ available copies
* Borrow model references Book using ObjectId
* Aggregation pipeline used for borrow summary
* Mongoose static method used to calculate availability post-borrow
* Mongoose middleware (pre/post) for data manipulation & validation

---

## 🐞 Error Format

All errors follow a consistent format:

```json
{
  "message": "Validation failed",
  "success": false,
  "error": {
    "name": "ValidationError",
    "errors": {
      "copies": {
        "message": "Copies must be a positive number"
      }
    }
  }
}
```

---

## 👨‍💻 Contributing

* Fork the repository
* Create a feature branch (git checkout -b feature/amazing-feature)
* Commit your changes (git commit -m 'Add some amazing feature')
* Push to the branch (git push origin feature/amazing-feature)
* Open a Pull Request

---

## 📄 License

This project is licensed under the [ISC License](LICENSE).

---

> 🚀 Happy coding! 
